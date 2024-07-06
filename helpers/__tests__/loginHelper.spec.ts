import bcrypt from "bcrypt";
import * as loginHelper from "../loginHelper";
import { waitFor } from "@testing-library/dom";

jest.mock("bcrypt");

describe("loginHelper", () => {
  afterEach(jest.restoreAllMocks);

  describe("hashPassword", () => {
    it("should return the hashed password", async () => {
      const password = "password123";
      const salt = "mockedSalt";
      const hashedPassword = "mockedHashedPassword";

      (bcrypt.genSalt as jest.Mock).mockResolvedValueOnce(salt);
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hashedPassword);

      const result = await loginHelper.hashPassword(password);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, salt);
      expect(result).toBe(hashedPassword);
    });

    it("should return null on error", async () => {
      const password = "password123";

      (bcrypt.genSalt as jest.Mock).mockRejectedValueOnce(new Error("ERROR"));

      const result = await loginHelper.hashPassword(password);

      await waitFor(() => {
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(result).toBeNull();
      });
    });
  });

  describe("comparePassword", () => {
    it("should return true if passwords match", async () => {
      const password = "password123";
      const hash = "mockedHashedPassword";

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await loginHelper.comparePassword(password, hash);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
      expect(result).toBe(true);
    });

    it("should return false if passwords do not match", async () => {
      const password = "password123";
      const hash = "mockedHashedPassword";

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await loginHelper.comparePassword(password, hash);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
      expect(result).toBe(false);
    });

    it("should return false on error", async () => {
      const password = "password123";
      const hash = "mockedHashedPassword";

      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new Error("Mocked error")
      );

      const result = await loginHelper.comparePassword(password, hash);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
      expect(result).toBe(false);
    });
  });
});
