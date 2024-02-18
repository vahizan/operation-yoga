import { ISession } from "../pages/api/interfaces";
import Email from "./interfaces/Email";
import axios from "axios";
import {
  ILessonTemplate,
  ILessonTemplateWithId,
} from "../model/admin/LessonTemplate.model";
import { IUser } from "../model/User.model";
import TemplateFilters from "../interfaces/TemplateFilters";
import GetTemplatesQuery from "../pages/api/interfaces/GetTemplatesQuery";

export const getSchedule = async (
  body?: Record<string, string>
): Promise<ISession[]> => {
  const response = await axios.get("/api/lessons?" + new URLSearchParams(body));
  return response?.data;
};

export const getInstructors = async (): Promise<{ data: IUser[] }> => {
  return await axios.get("/api/admin/instructors");
};

export const sendEmail = async (body?: Email): Promise<string> => {
  return await axios.post("/api/enquire", body);
};

export const createLessonTemplate = async (
  body?: ILessonTemplate
): Promise<string> => {
  return await axios.post("/api/admin/lesson/templates/create", body);
};

export const updateLessonTemplate = async (
  body: ILessonTemplateWithId
): Promise<ILessonTemplateWithId> => {
  return await axios.post("/api/admin/lesson/templates/update", body);
};

export const getLessonTemplates = async (
  filters: GetTemplatesQuery
): Promise<{ data: ILessonTemplateWithId[] }> => {
  let query = "";
  if (filters.userId) {
    query += `userId=${filters.userId}`;
  }
  if (filters.templateId) {
    query += `&templateId=${filters.templateId}`;
  }
  if (filters.createdById) {
    query += `createdById=${filters.createdById}`;
  }

  return await axios.get(
    `/api/admin/templates?${query}&limit=${filters.limit || 10}&page=${
      filters.page
    }`
  );
};
