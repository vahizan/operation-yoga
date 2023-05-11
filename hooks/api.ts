import { ISession } from "../pages/api/interfaces";

export const getSchedule = async (
  body?: Record<string, string>
): Promise<ISession[]> => {
  const response = await fetch("/api/lessons?" + new URLSearchParams(body));
  return response.json();
};
