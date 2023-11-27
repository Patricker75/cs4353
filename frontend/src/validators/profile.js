import states from "../utils/states";

const stateAbbrs = states.map((state) => state.value);

const validate = (data) => {
  if (!data.name) return -1;
  if (!data.addressPrimary) return -2;
  if (!data.city) return -3;
  if (!data.state) return -4;
  if (!data.zipCode) return -5;

  if (!/^[a-zA-Z -]*$/.test(data.name)) return -1;

  if (!/^\d+ [a-zA-Z ]+$/.test(data.addressPrimary)) return -2;
  if (data.addressAux && !/^\d+ [a-zA-Z ]+$/.test(data.addressAux)) {
    return -6;
  }

  if (!/^[a-zA-Z -]*$/.test(data.city)) return -3;

  if (!stateAbbrs.includes(data.state)) return -4;

  if (typeof data.zipCode !== "number") return -5;

  return 0;
};

export default validate;
