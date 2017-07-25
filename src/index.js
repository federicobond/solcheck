import findUp from "find-up"
import fs from "fs"
import glob from "glob"
import parser from "solidity-parser-antlr"

import SourceCode from './source-code'

const formatter = require("eslint/lib/formatters/codeframe")

const NAME = "solcheck"

function compareDescriptors(a, b) {
  const cmp = a.line - b.line
  if (cmp !== 0) {
    return cmp
  }
  return a.column - b.column
}

function lint(files, argv) {
  let results = []

  glob(files[0], (err, matches) => {
    for (let filePath of matches) {
      const text = fs.readFileSync(filePath).toString("utf-8")
      const report = processFile(filePath, text)
      results.push(report)
    }

    console.log(formatter(results))
  })
}

function getRules() {
  return require('./rules')
}

function processFile(filePath, source) {
  let messages = []

  let errorCount = 0
  let warningCount = 0

  const ast = parser.parse(source, { loc: true, range: true })

  for (let { ruleId, rule, severity } of getRules()) {
    let context = {
      report(descriptor) {

        if (descriptor.node) {
          const node = descriptor.node
          delete descriptor.node

          Object.assign(descriptor, {
            line: node.loc.start.line,
            column: node.loc.start.column + 1,
          })
        }

        const message = Object.assign(
          { ruleId, severity }, descriptor
        )

        if (message.severity === 2) {
          errorCount += 1
        } else if (message.severity === 1) {
          warningCount += 1
        }

        messages.push(message)
      },

      getSourceCode() {
        return new SourceCode(source, ast)
      }
    }
    parser.visit(ast, rule.create(context))
  }

  messages.sort(compareDescriptors)

  return { errorCount, warningCount, filePath, source, messages }
}

module.exports = function main() {
  const configPath = findUp.sync([`.${NAME}rc`])
  const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {}

  const argv = require("yargs")
    .usage("Usage: $0 [options] <files>")
    .option("verbose", {
      alias: "v",
      default: false
    })
    .version()
    .help()
    .config(config)
    .pkgConf(NAME).argv

  const files = argv._

  lint(files, argv)
}
