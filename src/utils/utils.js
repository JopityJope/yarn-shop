export function transformYarnName(inputName) {
  // Split the input name into words
  const words = inputName.split(/\s+/);

  // Remove the first word
  const modifiedWords = words.slice(1);

  // Join the modified words with spaces
  const result = modifiedWords.join(" ").toLowerCase();

  return result;
}

//Calc sale
export const calculateSale = (price, salePercentage = 30) => {
  const discountMultiplier = (100 - salePercentage) * 0.01;
  const discountedPrice = (discountMultiplier * price).toFixed(2);
  const [integerPart, decimalPart] = discountedPrice.split(".");
  const paddedDecimalPart =
    decimalPart.length === 1 ? decimalPart + "0" : decimalPart;

  return `${integerPart}.${paddedDecimalPart}`;
};
