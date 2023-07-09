import { ISession } from "../pages/api/interfaces";
import Email from "./interfaces/Email";
import axios from "axios";

export const getSchedule = async (
  body?: Record<string, string>
): Promise<ISession[]> => {
  const response = await fetch("/api/lessons?" + new URLSearchParams(body));
  return response.json();
};

export const sendEmail = async (body?: Email): Promise<string> => {
  return await axios.post("/api/enquire", body);
};
