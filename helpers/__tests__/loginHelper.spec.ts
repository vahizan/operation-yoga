import bcrypt from "bcryptjs";
import * as loginHelper from "../loginHelper";
import { waitFor } from "@testing-library/dom";

jest.mock("bcryptjs");

describe("loginHelper", () => {
  beforeEach(() => {
    process.env.PEPPER = "mockedPepper";
  });

  afterEach(jest.restoreAllMocks);

  describe("hashPassword", () => {
    it("should return the hashed password", async () => {
      const password = "password123";
      const pepperedPassword = password + process.env.PEPPER;
      const hashedPassword = "password123" + process.env.PEPPER + 10;

      (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hashedPassword);

      const result = await loginHelper.hashPassword(password);

      expect(bcrypt.hash).toHaveBeenCalledWith(pepperedPassword, 10);
      expect(result).toBe(hashedPassword);
    });

    it("should return null on error", async () => {
      const password = "password123";

      (bcrypt.genSalt as jest.Mock).mockRejectedValueOnce(new Error("ERROR"));

      const result = await loginHelper.hashPassword(password);

      await waitFor(() => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe("comparePassword", () => {
    it("should return true if passwords match", async () => {
      const pass = "password123";
      const pepperedPass = "password123" + process.env.PEPPER;
      const hash = "mockedHashedPassword";

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await loginHelper.comparePassword(pass, hash);

      expect(bcrypt.compare).toHaveBeenCalledWith(pepperedPass, hash);
      expect(result).toBe(true);
    });

    it("should return false if passwords do not match", async () => {
      const pass = "password123";
      const pepperedPass = "password123" + process.env.PEPPER;
      const hash = "mockedHashedPassword";

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await loginHelper.comparePassword(pass, hash);

      expect(bcrypt.compare).toHaveBeenCalledWith(pepperedPass, hash);
      expect(result).toBe(false);
    });

    it("should return false on error", async () => {
      const pass = "password123";
      const hash = "mockedHashedPassword";
      const pepperedPass = "password123" + process.env.PEPPER;

      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new Error("Mocked error")
      );

      const result = await loginHelper.comparePassword(pass, hash);

      expect(bcrypt.compare).toHaveBeenCalledWith(pepperedPass, hash);
      expect(result).toBe(false);
    });
  });
});
