import {
  handleGetProfile,
  handleProfileUpdate,
} from "../handlers/profileHandler";

describe("Test Profile Handlers", () => {
  test("Test profile update - valid", () => {
    const req = {
      body: {
        userID: "john.doe@example.com",
        profileData: {
          name: "John Doe",
          mainAddress: "123 City St.",
          auxAddress: "456 Town Rd.",
          city: "Houston",
          state: "TX",
          zipcode: "12345",
        },
      },
    };
    const res = {
      data: {},
      code: 0,

      status: function (status) {
        this.code = status;
      },
      send: function (input) {
        this.data = input;
      },
    };

    handleProfileUpdate(req, res);

    expect(res.data.message).toEqual("Profile updated successfully");
  });

  test("Test profile update - invalid", () => {
    const req = {
      body: {},
    };
    const res = {
      data: {},
      code: 0,

      status: function (status) {
        this.code = status;
      },
      send: function (input) {
        this.data = input;
      },
    };

    handleProfileUpdate(req, res);

    expect(res.data.error).toEqual("User ID not provided in the request.");
  });

  test("Test profile get - valid", () => {
    const req = {
      body: {
        userID: "john.doe@example.com",
      },
    };
    const res = {
      data: {},
      code: 0,

      status: function (status) {
        this.code = status;
      },
      send: function (input) {
        this.data = input;
      },
    };

    handleGetProfile(req, res);

    let profileData = {
      name: "John Doe",
      mainAddress: "123 City St.",
      auxAddress: "456 Town Rd.",
      city: "Houston",
      state: "TX",
      zipcode: "12345",
    };

    expect(res.data).toEqual(profileData);
  });

  test("Test profile get - invalid", () => {
    const req = {
      body: {},
    };
    const res = {
      data: {},
      code: 0,

      status: function (status) {
        this.code = status;
      },
      send: function (input) {
        this.data = input;
      },
    };

    handleGetProfile(req, res);

    expect(res.data.error).toEqual("User profile not found.");
  });
});
