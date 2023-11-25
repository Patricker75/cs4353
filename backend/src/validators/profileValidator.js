const validate = (profile) => {
  if (!profile.name) return false;
  if (!profile.addressPrimary) return false;
  if (!profile.city) return false;
  if (!profile.state) return false;
  if (!profile.zipCode) return false;

  if (!/^[a-zA-Z]+$/.test(profile.name)) return false;
  if (typeof profile.zipCode !== "number") return false;

  return true;
};

export default validate;
