class SourceCode {
  constructor(text, ast) {
    this.text = text
    this.ast = ast
    this.lines = text.split("\n")
  }

  getText(node) {
    return this.text.substring(node.range[0], node.range[1] + 1)
  }
}

export default SourceCode
