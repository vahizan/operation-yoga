import { ILesson, ISession } from "../pages/api/interfaces";
import Email from "./interfaces/Email";
import axios from "axios";
import AdminLessonQuery from "../pages/api/interfaces/AdminLessonQuery";
import { IPaginatedQuery } from "../pages/api/interfaces/IPaginatedQuery";

export const getSchedule = async (
  body?: Record<string, string>
): Promise<ISession[]> => {
  const response = await axios.get("/api/lessons?" + new URLSearchParams(body));
  return response?.data;
};

export const getInstructors = async (): Promise<{ data: any[] }> => {
  return await axios.get("/api/admin/instructors");
};

export const sendEmail = async (body?: Email): Promise<string> => {
  return await axios.post("/api/enquire", body);
};

export const createLessonTemplate = async (body?: any): Promise<string> => {
  return await axios.post("/api/admin/templates/create", body);
};

export const updateLessonTemplate = async (body: any): Promise<any> => {
  return await axios.post("/api/admin/lesson/templates/update", body);
};

export const getAdminLessons = async (
  filters: AdminLessonQuery
): Promise<{ data: any[] }> => {
  let query = "";
  if (filters.userId) {
    query += `userId=${filters.userId}`;
  }
  if (filters.id) {
    query += `&templateId=${filters.id}`;
  }
  if (filters.lessonCreatorId) {
    query += `createdById=${filters.lessonCreatorId}`;
  }

  return await axios.get(
    `/api/admin/templates?${query}&limit=${filters.limit || 10}&page=${
      filters.page
    }`
  );
};

export const getInstructorLessonSchedule = async (
  filters: IPaginatedQuery
): Promise<{ data: ILesson[] }> => {
  return await axios.get(
    `/api/admin/lessons?limit=${filters.limit}&page=${filters.page}`
  );
};
