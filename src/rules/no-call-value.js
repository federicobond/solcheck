module.exports = {
  meta: {
    docs: {
      description:
        "Report usages of call.value() instead of safer 'send' or 'transfer'.",
      category: "Best Practices"
    }
  },

  create(context) {
    function isCallValue(node) {
      const expr = node.expression

      return (
        expr.type === "MemberAccess" &&
        expr.memberName === "value" &&
        expr.expression.type === "MemberAccess" &&
        expr.expression.memberName === "call"
      )
    }

    return {
      FunctionCall(node) {
        if (isCallValue(node)) {
          context.report({
            line: node.loc.start.line,
            column: node.expression.loc.end.column,
            message: "Replace call.value() with 'send' or 'transfer'."
          })
        }
      }
    }
  }
}
