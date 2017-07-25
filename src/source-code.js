class SourceCode {

  constructor(text) {
    this.text = text
    this.lines = text.split('\n')
  }

  getText(node) {
    return this.text.substring(node.range[0], node.range[1] + 1)
  }

}

export default SourceCode
