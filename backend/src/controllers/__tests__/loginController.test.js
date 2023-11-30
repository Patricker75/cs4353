import { attemptLogin, registerLogin } from "../loginController";

import * as loginService from "../../services/loginService";
import * as hash from "../../utils/hash";

describe("tests registering a new login", () => {
  const email = "user@email.com";
  const password = "password";
  const hashedPassword = "hashedPassword";

  const mockAddLogin = jest.spyOn(loginService, "addLogin");
  const mockHashPassword = jest.spyOn(hash, "hashPassword");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should register a new login", async () => {
    mockAddLogin.mockResolvedValue(1);
    mockHashPassword.mockResolvedValue(hashedPassword);

    let loginId = await registerLogin(email, password);

    expect(mockAddLogin).toBeCalledWith(email, hashedPassword);
    expect(loginId).toEqual(1);
  });

  it("should handle used emails", async () => {
    mockAddLogin.mockRejectedValue({
      code: "23505",
    });
    mockHashPassword.mockResolvedValue(hashedPassword);

    try {
      await registerLogin(email, password);

      fail("should have thrown duplicate email error");
    } catch (error) {
      expect(mockAddLogin).toBeCalledWith(email, hashedPassword);
      expect(error.message).toEqual("Email is already in use");
    }
  });

  it("should throw error - not a duplicate email error", async () => {
    mockAddLogin.mockRejectedValue({
      code: "12345",
      message: "An error has occurred",
    });
    mockHashPassword.mockResolvedValue(hashedPassword);

    try {
      await registerLogin(email, password);

      fail("should have thrown duplicate email error");
    } catch (error) {
      expect(mockAddLogin).toBeCalledWith(email, hashedPassword);
      expect(error.message).toEqual("An error has occurred");
    }
  });
});

describe("tests login attempts", () => {
  const email = "user@email.com";
  const password = "password";
  const hashedPassword = "hashedPassword";

  const mockGetLogin = jest.spyOn(loginService, "getLogin");
  const mockComparePassword = jest.spyOn(hash, "comparePassword");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return userId - valid login", async () => {
    mockGetLogin.mockResolvedValue({
      id: 1,
      email,
      password: hashedPassword,
    });
    mockComparePassword.mockResolvedValue(true);

    let loginId = await attemptLogin(email, password);

    expect(mockGetLogin).toBeCalledWith(email);
    expect(mockComparePassword).toBeCalledWith(password, hashedPassword);
    expect(loginId).toEqual(1);
  });

  it("should return incorrect password/email - invalid email", async () => {
    mockGetLogin.mockResolvedValue(null);

    let loginId = await attemptLogin(email, password);

    expect(mockGetLogin).toBeCalledWith(email);
    expect(mockComparePassword).not.toBeCalled();
    expect(loginId).toEqual(-1);
  });

  it("should return incorrect password/email - invalid password", async () => {
    mockGetLogin.mockResolvedValue({
      id: 1,
      email,
      password: hashedPassword,
    });
    mockComparePassword.mockResolvedValue(false);

    let loginId = await attemptLogin(email, password);

    expect(mockGetLogin).toBeCalledWith(email);
    expect(mockComparePassword).toBeCalledWith(password, hashedPassword);
    expect(loginId).toEqual(-1);
  });

  it("should throw error - something wrong with database", async () => {
    mockGetLogin.mockRejectedValue(Error("An error has occurred"));

    try {
      await attemptLogin(email, password);

      fail("should have thrown error");
    } catch (error) {
      expect(error.message).toEqual("An error has occurred");
      expect(mockGetLogin).toBeCalledWith(email);
      expect(mockComparePassword).not.toBeCalled();
    }
  });
});
