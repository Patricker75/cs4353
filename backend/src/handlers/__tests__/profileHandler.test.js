import { handleGetProfile, handleUpdateProfile } from "../profileHandler";

import * as profileController from "../../controllers/profileController";

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

  const mockGetUserProfile = jest.spyOn(profileController, "getUserProfile");

  let mockRequest = {};
  let mockResponse = {};

  beforeEach(() => {
    jest.resetAllMocks();

    mockRequest = {
      get: (key) => {
        if (key === "userId") return userId;
      },
    };
    mockResponse = {
      send: jest.fn(),
      status: jest.fn(),
    };
  });

  it("should get profile - valid", async () => {
    mockGetUserProfile.mockResolvedValue(profile);

    await handleGetProfile(mockRequest, mockResponse);

    expect(mockGetUserProfile).toBeCalledWith(userId);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        profile,
      })
    );
  });

  it("should throw error - missing userId", async () => {
    mockRequest.get = () => undefined;

    await handleGetProfile(mockRequest, mockResponse);

    expect(mockGetUserProfile).not.toBeCalled();
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Missing userId",
      })
    );
  });

  it("should throw error - no profile found", async () => {
    mockGetUserProfile.mockResolvedValue(null);

    await handleGetProfile(mockRequest, mockResponse);

    expect(mockGetUserProfile).toBeCalledWith(userId);
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "profile not found",
      })
    );
  });

  it("should send an error - internal server error", async () => {
    mockGetUserProfile.mockRejectedValue(Error("An error has occurred"));

    await handleGetProfile(mockRequest, mockResponse);

    expect(mockGetUserProfile).toBeCalledWith(userId);
    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Internal Server Error",
      })
    );
  });

  it("should send an error - internal server error", async () => {
    mockGetUserProfile.mockRejectedValue(Error("An error has occurred"));

    await handleUpdateProfile(mockRequest, mockResponse);

    expect(mockGetUserProfile).toBeCalledWith(userId);
    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Internal Server Error",
      })
    );
  });
});

describe("tests creating a new profile", () => {
  const userId = 1;
  const profileData = {
    name: "name",
    addressPrimary: "primary",
    addressAux: "aux",
    city: "city",
    state: "ST",
    zipCode: 12345,
    newCustomer: null,
  };

  const profile = {
    userId,
    ...profileData,
  };

  const mockGetUserProfile = jest.spyOn(profileController, "getUserProfile");
  const mockCreateUserProfile = jest.spyOn(
    profileController,
    "createUserProfile"
  );
  const mockUpdateUserProfile = jest.spyOn(
    profileController,
    "updateUserProfile"
  );

  let mockRequest = {};
  let mockResponse = {};

  beforeEach(() => {
    jest.resetAllMocks();

    mockRequest = {
      body: {
        ...profileData,
      },
      get: (key) => {
        if (key === "userId") return userId;
      },
    };
    mockResponse = {
      send: jest.fn(),
      status: jest.fn(),
    };
  });

  it("should create a new profile - valid", async () => {
    mockGetUserProfile.mockResolvedValue(null);
    mockCreateUserProfile.mockResolvedValue(profile);

    await handleUpdateProfile(mockRequest, mockResponse);

    expect(mockGetUserProfile).toBeCalledWith(userId);
    expect(mockCreateUserProfile).toBeCalledWith(userId, profileData);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "OK",
      })
    );
  });

  it("should update a profile", async () => {
    mockGetUserProfile.mockResolvedValue(profile);
    mockUpdateUserProfile.mockImplementation();

    await handleUpdateProfile(mockRequest, mockResponse);

    expect(mockGetUserProfile).toBeCalledWith(userId);
    expect(mockUpdateUserProfile).toBeCalledWith(userId, profileData);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "OK",
      })
    );
  });

  it("should throw error - missing userId", async () => {
    mockRequest.get = () => undefined;

    await handleUpdateProfile(mockRequest, mockResponse);

    expect(mockCreateUserProfile).not.toBeCalled();
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Missing userId",
      })
    );
  });

  it("should send an error - internal server error", async () => {
    mockGetUserProfile.mockRejectedValue(Error("An error has occurred"));

    await handleUpdateProfile(mockRequest, mockResponse);

    expect(mockGetUserProfile).toBeCalledWith(userId);
    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Internal Server Error",
      })
    );
  });
});
