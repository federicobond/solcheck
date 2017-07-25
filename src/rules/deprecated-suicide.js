module.exports = {
  meta: {
    docs: {
      description: "Replace deprecated 'suicide' with 'selfdestruct'",
      category: "Best Practices"
    }
  },

  create(context) {
    function isSuicide(node) {
      return (
        node.expression.type == "Identifier" &&
        node.expression.name == "suicide"
      )
    }

    return {
      FunctionCall(node) {
        if (isSuicide(node)) {
          context.report({
            node: node,
            message: "Replace deprecated 'suicide' with 'selfdestruct'."
          })
        }
      }
    }
  }
}
