module.exports = {
  meta: {
    docs: {
      description: "Imports should be placed on top of the file",
      category: "Best Practices"
    }
  },

  create(context) {
    return {
      SourceUnit(node) {
        let contractFound = false

        for (let child of node.children) {
          if (child.type === "ContractDefinition") {
            contractFound = true
          } else if (
            contractFound === true &&
            child.type === "ImportDirective"
          ) {
            context.report({
              node: child,
              message: "Imports should be moved above all contracts."
            })
          }
        }
      }
    }
  }
}
