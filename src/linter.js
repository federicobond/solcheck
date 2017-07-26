import parser from "solidity-parser-antlr"
import SourceCode from './source-code'

function compareDescriptors(a, b) {
  const lineDiff = a.line - b.line
  if (lineDiff !== 0) {
    return lineDiff
  }
  return a.column - b.column
}


const PASSTHROUGHS = [
  'getSourceCode',
  'getFilename',
]


class RuleContext {
  constructor(linter, ruleId, severity) {
    this.linter = linter
    this.ruleId = ruleId
    this.severity = severity
  }

  report(descriptor) {
    descriptor.ruleId = this.ruleId
    descriptor.severity = this.severity

    if (descriptor.node) {
      const node = descriptor.node

      Object.assign(descriptor, {
        line: node.loc.start.line,
        column: node.loc.start.column + 1
      })

      delete descriptor.node
    }

    this.linter.report(descriptor)
  }
}

PASSTHROUGHS.forEach(key => {
  RuleContext.prototype[key] = function() {
    return this.linter[key].apply(this.linter, arguments)
  }
})


class Linter {

  constructor() {
    this.messages = []
    this.errorCount = 0
    this.warningCount = 0

    this.currentFilename = null
    this.sourceCode = null
  }

  getRules() {
    return Object.entries(require("./rules"))
  }

  getRuleSeverity() {
    return 2
  }

  report(problem) {

    if (problem.severity === 2) {
      this.errorCount += 1
    } else if (problem.severity === 1) {
      this.warningCount += 1
    }

    this.messages.push(problem)
  }

  getSourceCode() {
    return this.sourceCode
  }

  getFilename() {
    if (typeof this.currentFilename === 'string') {
      return this.currentFilename
    }
    return '<input>'
  }

  verify(source, filename) {
    const ast = parser.parse(source, { loc: true, range: true })
    this.sourceCode = new SourceCode(source, ast)
    this.currentFilename = filename

    for (let [key, ruleCreator] of this.getRules()) {
      const ruleContext = new RuleContext(this, key, this.getRuleSeverity(key))
      parser.visit(ast, ruleCreator.create(ruleContext))
    }

    this.messages.sort(compareDescriptors)
    this.sourceCode = null

    return {
      errorCount: this.errorCount,
      warningCount: this.warningCount,
      filePath: this.getFilename(),
      messages: this.messages,
      source
    }
  }
}

export default Linter
