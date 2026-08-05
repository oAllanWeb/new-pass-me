#!/usr/bin/env node

const { Command } = require("commander");
const { generatePassword } = require("./generatePassword");
const program = new Command();

program
  .option("-l, --length <number>", "length your new password", "12")
  .option("--symbols", "include symbols in password")
  .option("--numbers-only", "generate password using only numbers")
  .option("--letters-only", "generate password using only letters")
  .option("--no-lowercase", "exclude lowercase letters")
  .option("--no-uppercase", "exclude uppercase letters")
  .option("--no-numbers", "exclude numbers");

program.parse();

const options = program.opts();
const length = Number.parseInt(options.length, 10);

if (!Number.isInteger(length) || length <= 0) {
  console.error("Error: --length deve ser um numero inteiro maior que 0");
  process.exit(1);
}

if (options.numbersOnly && options.lettersOnly) {
  console.error("Error: use apenas uma entre --numbers-only e --letters-only");
  process.exit(1);
}

let generatorOptions = {
  length,
  includeLowercase: options.lowercase,
  includeUppercase: options.uppercase,
  includeNumbers: options.numbers,
  includeSymbols: Boolean(options.symbols),
};

if (options.numbersOnly) {
  generatorOptions = {
    length,
    includeLowercase: false,
    includeUppercase: false,
    includeNumbers: true,
    includeSymbols: false,
  };
}

if (options.lettersOnly) {
  generatorOptions = {
    length,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: false,
    includeSymbols: false,
  };
}

try {
  console.log(generatePassword(generatorOptions));
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
