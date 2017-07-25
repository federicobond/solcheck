module.exports = {
  meta: {
    docs: {
      description:
        "Replace deprecated throw with require() and assert() clauses.",
      category: "Best Practices"
    }
  },

  create(context) {
    return {
      ThrowStatement(node) {
        context.report({
          node: node,
          message: "Replace deprecated throw with require() or assert() clause."
        })
      }
    }
  }
}
