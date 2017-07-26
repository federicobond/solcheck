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
}

export default SourceCode
