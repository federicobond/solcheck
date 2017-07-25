module.exports = {
  meta: {
    docs: {
      description: "Enforce a consistent naming style",
      category: "Best Practices"
    }
  },

  create(context) {
    function isFallbackFunction(node) {
      return node.name === ""
    }

    function isCapitalizedWords(string) {
      return /^[A-Z][a-zA-Z0-9]*$/.test(string)
    }

    function isMixedCase(string) {
      return /^[a-z][a-zA-Z0-9]*$/.test(string)
    }

    function isUpperCaseWithUnderscores(string) {
      return /^[A-Z][A-Z0-9_]*$/.test(string)
    }

    return {
      ContractDefinition(node) {
        if (!isCapitalizedWords(node.name)) {
          context.report({
            node,
            message: "Contract name must be in CapitalizedWords style."
          })
        }
      },

      FunctionDefinition(node) {
        if (!isFallbackFunction(node) && !isMixedCase(node.name)) {
          context.report({
            node,
            message: "Function name must be in mixedCase style."
          })
        }
      },

      ModifierDefinition(node) {
        if (!isMixedCase(node.name)) {
          context.report({
            node,
            message: "Modifier name must be in mixedCase style."
          })
        }
      },

      EventDefinition(node) {
        if (!isCapitalizedWords(node.name)) {
          context.report({
            node,
            message: "Event name must be in CapitalizedWords style."
          })
        }
      },

      VariableDeclaration(node) {
        if (
          node.isStateVar &&
          node.isDeclaredConst &&
          !isUpperCaseWithUnderscores(node.name)
        ) {
          context.report({
            node,
            message: "Constants must be in UPPER_CASE_WITH_UNDERSCORES style."
          })
          return
        }

        if (!isMixedCase(node.name)) {
          context.report({
            node,
            message: "Variables must be in mixedCase style."
          })
        }
      }
    }
  }
}
