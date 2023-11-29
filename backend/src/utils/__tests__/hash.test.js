import { hashPassword, comparePassword } from "../hash";

describe("tests hash algorithm", () => {
  const password = "password";
  const hashedPassword =
    "$2b$04$EkIbh7O6CjnXkvPhlMkWjuE4XMgn7ar9svE4JprZzCR.5wWib8FBW";

  it("should return a hashed password", async () => {
    let result = await hashPassword(password);

    expect(result).not.toEqual(password);
  });

  it("should compare passwords", async () => {
    let result = await comparePassword(password, hashedPassword);

    expect(result).toBe(true);
  });
});
