module.exports = [
  {
    ruleId: "deprecated-suicide",
    rule: require("./deprecated-suicide"),
    severity: 2
  },
  {
    ruleId: "deprecated-throw",
    rule: require("./deprecated-throw"),
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
  },
  {
    ruleId: "no-mixed-spaces-and-tabs",
    rule: require("./no-mixed-spaces-and-tabs"),
    severity: 2
  },
  {
    ruleId: "no-call-value",
    rule: require("./no-call-value"),
    severity: 2
  },
  {
    ruleId: "similar-names",
    rule: require("./similar-names"),
    severity: 2
  }
]
