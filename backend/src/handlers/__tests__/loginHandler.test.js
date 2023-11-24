import { handleLogin, handleNewLogin } from "../loginHandler";

import * as loginController from "../../controllers/loginController";

describe("tests new logins", () => {
  const email = "user@email.com";
  const password = "password";

  const mockRegisterLogin = jest.spyOn(loginController, "registerLogin");

  const mockRequest = {
    body: {
      email,
      password,
    },
  };
  const mockResponse = {
    send: jest.fn(),
    status: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should send a valid user id - valid registration", async () => {
    mockRegisterLogin.mockResolvedValue(1);

    await handleNewLogin(mockRequest, mockResponse);

    expect(mockRegisterLogin).toBeCalledWith(email, password);
    expect(mockResponse.status).toBeCalledWith(201);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "Registration Successful",
        id: 1,
      })
    );
  });

  it("should send an error - email in use", async () => {
    mockRegisterLogin.mockRejectedValue(Error("Email is already in use"));

    await handleNewLogin(mockRequest, mockResponse);

    expect(mockRegisterLogin).toBeCalledWith(email, password);
    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "Email is already in use",
      })
    );
  });
});

describe("tests login attempts", () => {
  const email = "user@email.com";
  const password = "password";

  const mockAttemptLogin = jest.spyOn(loginController, "attemptLogin");

  const mockRequest = {
    body: {
      email,
      password,
    },
  };
  const mockResponse = {
    send: jest.fn(),
    status: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should send a valid user id - valid login", async () => {
    mockAttemptLogin.mockResolvedValue(1);

    await handleLogin(mockRequest, mockResponse);

    expect(mockAttemptLogin).toBeCalledWith(email, password);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "Login Successful",
        id: 1,
      })
    );
  });

  it("should send an error - invalid login", async () => {
    mockAttemptLogin.mockResolvedValue(-1);

    await handleLogin(mockRequest, mockResponse);

    expect(mockAttemptLogin).toBeCalledWith(email, password);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "Invalid Email or Password",
      })
    );
  });
});
