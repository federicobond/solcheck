module.exports = [
  {
    ruleId: "deprecated-suicide",
    rule: require("./deprecated-suicide"),
    severity: 2
  },
  {
    ruleId: "naming",
    rule: require("./naming"),
    severity: 2
  },
  {
    ruleId: "imports-on-top",
    rule: require("./imports-on-top"),
    severity: 2
  }
]
