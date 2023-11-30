import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../profileController";

import * as profileService from "../../services/profileService";

describe("tests getting a profile", () => {
  const userId = 1;

  const profile = {
    userId,
    name: "name",
    addressPrimary: "primary",
    addressAux: "aux",
    city: "city",
    state: "ST",
    zipCode: 12345,
    newCustomer: null,
  };

  const mockGetProfile = jest.spyOn(profileService, "getProfile");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return user's profile - valid profile", async () => {
    mockGetProfile.mockResolvedValue({
      ...profile,
    });

    let result = await getUserProfile(userId);

    expect(mockGetProfile).toBeCalledWith(userId);
    expect(result).toEqual(profile);
  });

  it("should throw null - invalid profile", async () => {
    mockGetProfile.mockResolvedValue(null);

    let result = await getUserProfile(userId);

    expect(mockGetProfile).toBeCalledWith(userId);
    expect(result).toBeNull();
  });

  it("should throw error - something wrong with database", async () => {
    mockGetProfile.mockRejectedValue(Error("An error has occurred"));

    try {
      await getUserProfile(userId);

      fail("should have thrown error");
    } catch (error) {
      expect(error.message).toEqual("An error has occurred");
      expect(mockGetProfile).toBeCalledWith(userId);
    }
  });
});

describe("tests creating a new profile", () => {
  const userId = 1;
  let profile = {};

  const mockAddProfile = jest.spyOn(profileService, "addProfile");

  beforeEach(() => {
    jest.resetAllMocks();

    profile = {
      name: "name",
      addressPrimary: "primary",
      addressAux: "aux",
      city: "city",
      state: "ST",
      zipCode: 12345,
      newCustomer: null,
    };
  });

  it("should create a new profile - valid profile", async () => {
    mockAddProfile.mockResolvedValue();

    await createUserProfile(userId, profile);

    expect(mockAddProfile).toBeCalledWith(userId, profile);
  });

  it("should throw error - invalid profile", async () => {
    mockAddProfile.mockResolvedValue();

    delete profile.addressPrimary;

    try {
      await createUserProfile(userId, profile);
      fail("should have thrown error");
    } catch (error) {
      expect(error.message).toEqual("Invalid Profile");
    }
  });
});

describe("tests updating a profile", () => {
  const userId = 1;
  let profile = {};

  const mockUpdateProfile = jest.spyOn(profileService, "updateProfile");

  beforeEach(() => {
    jest.resetAllMocks();

    profile = {
      name: "name",
      addressPrimary: "primary",
      addressAux: "aux",
      city: "city",
      state: "ST",
      zipCode: 12345,
      newCustomer: null,
    };
  });

  it("should update profile - valid profile", async () => {
    mockUpdateProfile.mockResolvedValue();

    await updateUserProfile(userId, profile);

    expect(mockUpdateProfile).toBeCalledWith(userId, profile);
  });

  it("should throw error - invalid profile", async () => {
    mockUpdateProfile.mockResolvedValue();

    delete profile.addressPrimary;

    try {
      await updateUserProfile(userId, profile);
      fail("should have thrown error");
    } catch (error) {
      expect(error.message).toEqual("Invalid Profile");
    }
  });
});
