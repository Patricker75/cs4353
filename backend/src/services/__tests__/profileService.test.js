import { addProfile, getProfile, updateProfile } from "../profileService";

import * as db from "../../db";

const mockExecuteQuery = jest.spyOn(db, "executeQuery");

describe("tests getting a user profile", () => {
  const userId = 1;

  const profile = {
    userId,
    name: "name",
    addressPrimary: "address primary",
    addressAux: "address aux",
    city: "city",
    state: "state",
    zipCode: 123,
    newCustomer: false,
  };

  it("should return a profile object - using user_id", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [
        {
          user_id: profile.userId,
          name: profile.name,
          address_primary: profile.addressPrimary,
          address_aux: profile.addressAux,
          city: profile.city,
          state: profile.state,
          zip_code: profile.zipCode,
          new_customer: profile.newCustomer,
        },
      ],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await getProfile(userId);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [userId],
      })
    );
    expect(result).toEqual(profile);
    expect(typeof result.userId).toBe("number");
    expect(typeof result.zipCode).toBe("number");
    expect(typeof result.newCustomer).toBe("boolean");
  });
});

describe("tests creating a new profile", () => {
  const userId = 1;

  const profileData = {
    name: "name",
    addressPrimary: "address primary",
    addressAux: "address aux",
    city: "city",
    state: "state",
    zipCode: 123,
  };

  it("should create a new user profile", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [
        {
          user_id: userId,
        },
      ],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await addProfile(profileData);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [
          profileData.name,
          profileData.addressPrimary,
          profileData.addressAux,
          profileData.city,
          profileData.state,
          profileData.zipCode,
        ],
      })
    );
    expect(result).toEqual(userId);
    expect(typeof result).toBe("number");
  });
});

describe("tests updating a profile", () => {
  const userId = 1;

  const profileData = {
    name: "name",
    addressPrimary: "address primary",
    addressAux: "address aux",
    city: "city",
    state: "state",
    zipCode: 123,
  };

  it("should create a new user profile", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    await updateProfile(userId, profileData);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [
          userId,
          profileData.name,
          profileData.addressPrimary,
          profileData.addressAux,
          profileData.city,
          profileData.state,
          profileData.zipCode,
        ],
      })
    );
  });
});
