const validate = (data) => {
  if (!data.email) return -1;
  if (!data.password) return -2;

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email))
    return -1;

  return 0;
};

export default validate;
