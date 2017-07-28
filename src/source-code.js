class SourceCode {
  constructor(text, ast) {
    this.text = text
    this.ast = ast
    this.lines = text.split("\n")
  }

  getText(node, beforeCount = 0, afterCount = 0) {
    return this.text.substring(
      node.range[0] - beforeCount,
      node.range[1] + afterCount + 1
    )
  }

  getLines() {
    return this.lines
  }

  getFirstToken(node) {
    return this.ast.tokens.filter(t => (
      t.range[0] === node.range[0]
    ))[0]
  }

  getLastToken(node) {
    return this.ast.tokens.filter(t => (
      t.range[1] === node.range[1] + 1
    ))[0]
  }

  getTokens(node) {
    return this.ast.tokens.filter(t => (
      t.range[0] >= node.range[0] &&
      t.range[1] <= node.range[1]
    ))
  }
}

export default SourceCode
