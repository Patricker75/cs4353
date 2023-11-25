import validateProfile from "../profileValidator";

describe("tests profile validator", () => {
  let profile = {};

  beforeEach(() => {
    profile = {
      userId: 1,
      name: "name",
      addressPrimary: "primary",
      addressAux: "aux",
      city: "city",
      state: "ST",
      zipCode: 12345,
    };
  });

  it("should return true - valid profile", () => {
    let result = validateProfile(profile);

    expect(result).toBe(true);
  });

  it("should return false - name missing", () => {
    delete profile.name;

    let result = validateProfile(profile);

    expect(result).toBe(false);
  });

  it("should return false - primary address missing", () => {
    delete profile.addressPrimary;

    let result = validateProfile(profile);

    expect(result).toBe(false);
  });

  it("should return false - city missing", () => {
    delete profile.city;

    let result = validateProfile(profile);

    expect(result).toBe(false);
  });

  it("should return false - state missing", () => {
    delete profile.state;

    let result = validateProfile(profile);

    expect(result).toBe(false);
  });

  it("should return false - zip code missing", () => {
    delete profile.zipCode;

    let result = validateProfile(profile);

    expect(result).toBe(false);
  });

  it("should return false - name is not alphanbet", () => {
    profile.name = "123abakl";

    let result = validateProfile(profile);

    expect(result).toBe(false);
  });

  it("should return false - zip code is not numeric", () => {
    profile.zipCode = "12345";

    let result = validateProfile(profile);

    expect(result).toBe(false);
  });
});
