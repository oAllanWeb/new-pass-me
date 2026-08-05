const DEFAULT_CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%&",
};

function randomInt(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}

function toSafeLength(length) {
  const normalizedLength = Number.parseInt(length, 10);

  if (!Number.isInteger(normalizedLength) || normalizedLength <= 0) {
    throw new Error("length deve ser um numero inteiro maior que 0");
  }

  return normalizedLength;
}

function buildPool(options, charsets) {
  const {
    includeLowercase = true,
    includeUppercase = true,
    includeNumbers = true,
    includeSymbols = false,
  } = options;

  let pool = "";

  if (includeLowercase) {
    pool += charsets.lowercase;
  }

  if (includeUppercase) {
    pool += charsets.uppercase;
  }

  if (includeNumbers) {
    pool += charsets.numbers;
  }

  if (includeSymbols) {
    pool += charsets.symbols;
  }

  if (!pool) {
    throw new Error("Pelo menos um conjunto de caracteres deve ser habilitado");
  }

  return pool;
}

function createPasswordGenerator(customConfig = {}) {
  const charsets = {
    ...DEFAULT_CHARSETS,
    ...(customConfig.charsets || {}),
  };

  const getRandomInt = customConfig.randomInt || randomInt;

  return function generatePassword(input = {}) {
    const options =
      typeof input === "number" || typeof input === "string"
        ? { length: input }
        : input;

    const length = toSafeLength(options.length || 12);
    const pool = buildPool(options, charsets);

    let password = "";

    for (let i = 0; i < length; i++) {
      password += pool.charAt(getRandomInt(pool.length));
    }

    return password;
  };
}

const generatePassword = createPasswordGenerator();

// Alias para manter compatibilidade com a API antiga.
const generate = generatePassword;

module.exports = {
  DEFAULT_CHARSETS,
  createPasswordGenerator,
  generatePassword,
  generate,
};
