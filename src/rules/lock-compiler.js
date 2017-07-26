const LOCKED_VERSION = /^\d+(\.\d+)*$/

module.exports = {
  meta: {
    docs: {
      description: "Lock pragmas to specific compiler version",
      category: "Best Practices"
    }
  },

  create(context) {
    return {
      PragmaDirective(node) {
        const text = context.getSourceCode().getText(node)
        const valueIndex = text.indexOf(node.value)

        if (!LOCKED_VERSION.test(node.value)) {
          context.report({
            line: node.loc.start.line,
            column: node.loc.start.column + valueIndex + 1,
            message: "Lock pragma to specific compiler version."
          })
        }
      }
    }
  }
}
