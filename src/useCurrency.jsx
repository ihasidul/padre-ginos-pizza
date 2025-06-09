const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
console.log(intl);
export const priceConverter = (price) => intl.format(price);
export default function useCurrency(price) {
  return intl.format(price);
}
