const validate = (data) => {
  if (!data.amount) return -1;
  if (!data.totalPrice) return -2;
  if (!data.deliveryAddress) return -3;
  if (!data.deliveryDate) return -4;

  if (data.amount < 1) return -1;

  if (data.amount < 1) return -2;

  if (!/^\d+ [a-zA-Z ]+$/.test(data.deliveryAddress)) return -3;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.deliveryDate)) return -4;

  return 0;
};

export default validate;
