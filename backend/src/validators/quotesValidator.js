const validate = (quote) => {
  if (!quote.amount) return false;
  if (!quote.totalPrice) return false;
  if (!quote.deliveryDate) return false;

  if (typeof quote.amount !== "number") return false;
  if (typeof quote.totalPrice !== "number") return false;

  if (!(quote.deliveryDate instanceof Date)) return false;

  return true;
};

export default validate;
