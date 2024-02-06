import { ISession } from "../pages/api/interfaces";
import Email from "./interfaces/Email";
import axios from "axios";
import {
  ILessonTemplate,
  ILessonTemplateWithId,
} from "../model/admin/LessonTemplate.model";
import { IUser } from "../model/User.model";

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
): Promise<string> => {
  return await axios.post("/api/admin/lesson/templates/update", body);
};

export const getLessonTemplatesByCreatedUserId = async (
  userId: string
): Promise<string> => {
  return await axios.get(`/api/admin/lesson/templates/${userId}`);
};
