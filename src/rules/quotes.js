module.exports = {
  meta: {
    docs: {
      description:
        "Strings should be quoted with double-quotes instead of single-quotes.",
      category: "Best Practices"
    }
  },

  create(context) {
    const sourceCode = context.getSourceCode()

    return {
      StringLiteral(node) {
        const quotedString = sourceCode.getText(node)

        if (quotedString.startsWith("'")) {
          context.report({
            node,
            message: "Use double quotes for string literals."
          })
        }
      }
    }
  }
}
