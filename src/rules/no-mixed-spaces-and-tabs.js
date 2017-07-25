module.exports = {
  meta: {
    docs: {
      description: "Disallow mixed spaces and tabs for indentation",
      category: "Best Practices"
    }
  },

  create(context) {
    const lines = context.getSourceCode().lines

    function containsMixedIndentation(line) {
      const index = line.search(/\S|$/)
      const start = line.substring(0, index)
      return start.includes('\t') && start.includes(' ')
    }

    return {
      ['SourceUnit:exit'](node) {
        lines
          .map((line, index) => [line, index])
          .filter(([line, index]) => containsMixedIndentation(line))
          .forEach(([line, index]) => {
            context.report({
              line: index + 1,
              column: 1,
              message: "Mixed spaces and tabs"
            })
          })
      }
    }
  }
}
