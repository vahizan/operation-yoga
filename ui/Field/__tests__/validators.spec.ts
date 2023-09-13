import { isValidEmail, isValidPhone } from "../validators";

describe("isValidEmail", () => {
  it("should return true for valid emails", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("another.email@example.co.uk")).toBe(true);
  });

  it("should return false for invalid emails", () => {
    expect(isValidEmail("invalid-email")).toBe(false);
    expect(isValidEmail("test@.com")).toBe(false);
    expect(isValidEmail("test@example")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("should return true for valid phone numbers", () => {
    expect(isValidPhone("1234567890")).toBe(true);
    expect(isValidPhone("+1 (123) 456-7890")).toBe(true);
  });

  it("should return false for invalid phone numbers", () => {
    expect(isValidPhone("not-a-phone-number")).toBe(false);
    expect(isValidPhone("12345678901234567")).toBe(false);
  });
});
