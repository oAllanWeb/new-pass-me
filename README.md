NewPass.me

This project is a password generator that works as CLI and also as a reusable module.

CLI usage

```sh
npx new-pass-me -l 12
```

Available flags

```sh
# only numbers
npx new-pass-me -l 10 --numbers-only

# only letters
npx new-pass-me -l 14 --letters-only

# include symbols
npx new-pass-me -l 16 --symbols

# custom set by exclusions
npx new-pass-me -l 12 --no-uppercase --no-numbers
```

Use as module

```js
const { generatePassword, createPasswordGenerator } = require("new-pass-me");

const password = generatePassword({
  length: 16,
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSymbols: true,
});

console.log(password);

const customGenerator = createPasswordGenerator({
  charsets: {
    symbols: "@#*",
  },
});

console.log(customGenerator({ length: 12, includeSymbols: true }));
```
