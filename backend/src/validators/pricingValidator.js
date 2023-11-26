const validate = (amount) => {
  if (!amount) return false;

  if (typeof amount !== "number") return false;

  return true;
};

export default validate;
