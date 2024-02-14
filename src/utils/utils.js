export function transformYarnName(inputName) {
  // Split the input name into words
  const words = inputName.split(/\s+/);

  // Remove the first word
  const modifiedWords = words.slice(1);

  // Join the modified words with spaces
  const result = modifiedWords.join("").toLowerCase();

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

/* // Calculate the date 4 days from now
const currentDate = new Date();
const deliveryDate = new Date(currentDate);
deliveryDate.setDate(deliveryDate.getDate() + 4);

// Format the delivery date
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};
export const formattedDeliveryDate = deliveryDate.toLocaleDateString(
  "en-US",
  options
); */

// Calculate the date 4 days from now excluding weekends
const currentDate = new Date();
let deliveryDate = new Date(currentDate);

// Function to check if a given date is a weekend (Saturday or Sunday)
function isWeekend(date) {
  return date.getDay() === 0 || date.getDay() === 6; // 0 is Sunday, 6 is Saturday
}

// Loop to find the delivery date excluding weekends
for (let i = 0, count = 0; count < 4; i++) {
  deliveryDate.setDate(currentDate.getDate() + i);
  if (!isWeekend(deliveryDate)) {
    count++;
  }
}
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};
export const formattedDeliveryDate = deliveryDate.toLocaleDateString(
  "en-US",
  options
);
