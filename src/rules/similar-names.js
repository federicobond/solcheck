module.exports = {
  meta: {
    docs: {
      description: "Warn similar names between variables, events and functions",
      category: "Best Practices"
    }
  },

  create(context) {
    const names = []

    function checkAndAddName(node) {
      const name = node.name.toLowerCase()

      if (names.includes(name)) {
        const text = context.getSourceCode().getText(node)
        const index = text.indexOf(name)

        context.report({
          line: node.loc.start.line,
          column: node.loc.start.column + index + 1,
          message: "Similar name found elsewhere."
        })
      }
      names.push(name)
    }

    return {
      EventDefinition(node) {
        checkAndAddName(node)
      },

      FunctionDefinition(node) {
        checkAndAddName(node)
      },

      VariableDeclaration(node) {
        checkAndAddName(node)
      }
    }
  }
}
