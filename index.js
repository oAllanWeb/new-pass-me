#!/usr/bin/env node

const { Command } = require("commander");
const generate = require("./generatePassword").generate;
const program = new Command();

program.option("-l, --length <char>", "length your new password", "8");

program.parse();

const options = program.opts();

const { length } = options;

console.log(generate(length));
