import { attemptLogin, registerLogin } from "../loginController";

import * as loginService from "../../services/loginService";
import { hashPassword } from "../../utils/hash";

describe("tests registering a new login", () => {
  const email = "user@email.com";
  const password = "password";

  const mockAddLogin = jest.spyOn(loginService, "addLogin");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should register a new login", async () => {
    mockAddLogin.mockResolvedValue(1);

    let hashedPassword = hashPassword(password);

    let loginId = await registerLogin(email, password);

    expect(mockAddLogin).toBeCalledWith(email, hashedPassword);
    expect(loginId).toEqual(1);
  });

  it("should handle used emails", async () => {
    mockAddLogin.mockRejectedValue({
      code: "23505",
    });

    let hashedPassword = hashPassword(password);

    try {
      await registerLogin(email, password);

      fail("should have thrown duplicate email error");
    } catch (error) {
      expect(mockAddLogin).toBeCalledWith(email, hashedPassword);
      expect(error.message).toEqual("Email is already in use");
    }
  });
});

describe("tests login attempts", () => {
  const email = "user@email.com";
  const password = "password";

  const mockGetLogin = jest.spyOn(loginService, "getLogin");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return userId - valid login", async () => {
    mockGetLogin.mockResolvedValue(1);

    let hashedPassword = hashPassword(password);

    let loginId = await attemptLogin(email, password);

    expect(mockGetLogin).toBeCalledWith(email, hashedPassword);
    expect(loginId).toEqual(1);
  });

  it("should return incorrect password/email - invalid login", async () => {
    mockGetLogin.mockResolvedValue(null);

    let hashedPassword = hashPassword(password);

    let loginId = await attemptLogin(email, password);

    expect(mockGetLogin).toBeCalledWith(email, hashedPassword);
    expect(loginId).toEqual(-1);
  });
});
