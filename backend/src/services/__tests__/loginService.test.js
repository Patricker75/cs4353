import { addLogin, getLogin } from "../loginService";

import * as db from "../../db";

const mockExecuteQuery = jest.spyOn(db, "executeQuery");

describe("tests adding a new login", () => {
  const loginId = 1;

  const email = "user@mail.com";
  const hashedPassword = "superhash";

  it("should create a new login - unique email", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [
        {
          id: loginId,
        },
      ],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await addLogin(email, hashedPassword);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [email, hashedPassword],
      })
    );
    expect(result).toEqual(loginId);
    expect(typeof result).toEqual("number");
  });
});

describe("tests getting a login", () => {
  const loginId = 1;

  const email = "user@mail.com";
  const hashedPassword = "hashedPassword";

  it("should get a login - login with email exists", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [
        {
          id: loginId,
          email: email,
          password: hashedPassword,
        },
      ],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await getLogin(email);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [email],
      })
    );
    expect(result).toEqual(loginId);
    expect(typeof result).toEqual("number");
  });

  it("should get an null - login with email does not exist", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await getLogin(email);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [email],
      })
    );
    expect(result).toBeNull();
  });
});
