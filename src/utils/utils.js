export function transformYarnName(inputName) {
  // Split the input name into words
  const words = inputName.split(/\s+/);

  // Remove the first word
  const modifiedWords = words.slice(1);

  // Join the modified words with spaces
  const result = modifiedWords.join(" ").toLowerCase();

  return result;
}
