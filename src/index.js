import findUp from "find-up"
import fs from "fs"
import getStdin from 'get-stdin'
import globby from "globby"

import Linter from "./linter"

const NAME = "solcheck"
const DEFAULT_FORMAT = "codeframe"

function getFormatter(options) {
  try {
    return require(`eslint/lib/formatters/${options.format}`)
  } catch (e) {
    console.error(`Error: unknown formatter '${options.format}'`)
    process.exit(1);
  }
}

function lint(patterns, options) {
  let results = []

  globby(patterns, { nodir: true }).then(matches => {
    for (let filename of matches) {
      const text = fs.readFileSync(filename).toString("utf-8")
      const report = verify(text, filename)
      results.push(report)
    }

    console.log(getFormatter(options)(results))
  })
}

function verify(source, filename) {
  return new Linter().verify(source, filename)
}

module.exports = function main() {
  const configPath = findUp.sync([`.${NAME}rc`])
  const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {}

  const argv = require("yargs")
    .usage("Usage: $0 [options] <files>")
    .option("verbose", {
      alias: "v",
      default: false
    })
    .option("format", {
      alias: "f",
      default: DEFAULT_FORMAT
    })
    .option("stdin", {
      desc: "Lint code provided on <STDIN>",
      type: "boolean",
      default: false
    })
    .option("stdin-filename", {
      desc: "Specify filename to process STDIN as",
      default: '<input>',
      type: "string"
    })
    .version()
    .help()
    .config(config)
    .pkgConf(NAME).argv

  if (argv.stdin) {

    getStdin().then(str => {
      const results = [verify(str, argv['stdin-filename'])]
      console.log(getFormatter(argv)(results))
    })

  } else {

    const files = argv._
    lint(files, argv)

  }
}
