#! /usr/bin/env node
const yargs = require("yargs");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const usage = "\nUsage: run <rcx ContextName> command on the folder you want the context";
const options = yargs.usage(usage).help(true).argv;
const contextName = _.upperFirst(_.camelCase(yargs.argv._[0]));
if (!contextName) {
	console.log(usage);
	process.exit(1);
}

const templateName = "default";
const templateContent = fs.readFileSync(path.resolve(`${__dirname}/templates/${templateName}.template`), "utf8");
const newTemplateContent = templateContent.replace(/{{contextName}}/g, contextName);
if (fs.existsSync(`${contextName}Context`)) {
	console.log("The directory already exists");
	process.exit(1);
}
const newFolder = fs.mkdirSync(`${contextName}Context`, {recursive: true});
fs.writeFileSync(path.resolve(`${newFolder}/index.tsx`), newTemplateContent);

