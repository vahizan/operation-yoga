import { getAdminLessons } from "../api";
import axios from "axios";

jest.mock("axios");

describe("API hooks", () => {
  describe("getAdminLessons", () => {
    it("should return lesson templates", async () => {
      (axios as jest.Mocked<typeof axios>).get.mockResolvedValue({
        data: ["hello"],
      });
      const response = await getAdminLessons({
        limit: 0,
        page: 0,
        userId: "1",
      });
      expect(axios.get).toHaveBeenCalledWith(
        "/api/admin/templates?userId=1&limit=10&page=0"
      );
      expect(response).toEqual({ data: ["hello"] });
    });

    it("should return lesson templates with filters", async () => {
      (axios as jest.Mocked<typeof axios>).get.mockResolvedValue({
        data: ["hello filters"],
      });
      const response = await getAdminLessons({
        limit: 0,
        page: 0,
        userId: "1",
        id: "1",
        lessonCreatorId: "1",
      });
      expect(axios.get).toHaveBeenCalledWith(
        "/api/admin/templates?userId=1&templateId=1createdById=1&limit=10&page=0"
      );
      expect(response).toEqual({ data: ["hello filters"] });
    });
  });
});
