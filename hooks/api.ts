import { ISession } from "../pages/api/interfaces";
import Email from "./interfaces/Email";
import axios from "axios";
import { ILessonTemplate } from "../model/admin/LessonTemplate.model";
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
