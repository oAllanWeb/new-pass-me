function replaceCharacter(string, index, replacement) {
  return (
    string.slice(0, index) +
    replacement +
    string.slice(index + replacement.length)
  );
}
const generate = (lengthPass) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const especialCharacters = "!@#$%&";
  const especial = Math.floor(Math.random() * 5 + 1);
  for (let i = 0; i < lengthPass; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  for (let j = 0; j < especial; j++) {
    let char = especialCharacters.charAt(
      Math.floor(Math.random() * especialCharacters.length),
    );

    result = replaceCharacter(
      result,
      Math.floor(Math.random() * (0 - result.length) + result.length),
      char,
    );
  }

  return result;
};
module.exports = { generate };
