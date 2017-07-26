module.exports = {
  meta: {
    docs: {
      description:
        "Add explicit visibility specifiers to functions and state variables",
      category: "Best Practices"
    }
  },

  create(context) {
    function isFallbackFunction(node) {
      return node.name === ''
    }

    return {
      VariableDeclaration(node) {
        if (node.visibility === 'default' && node.isStateVar) {
          context.report({
            node,
            message: "Add explicit visibility specifier to state variable."
          })
        }
      },

      FunctionDefinition(node) {
        if (node.visibility === 'default' && !node.isConstructor && !isFallbackFunction(node)) {
          context.report({
            node,
            message: "Add explicit visibility specifier to function."
          })
        } else if (isFallbackFunction(node) && node.visibility !== 'default') {
          context.report({
            node,
            message: "Fallback function visibility is ignored."
          })
        }
      }
    }
  }
}
