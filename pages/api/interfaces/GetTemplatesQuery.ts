import { IPaginatedQuery } from "./IPaginatedQuery";

export interface GetTemplatesQuery extends IPaginatedQuery {
  userId?: string;
  templateId?: string;
  createdById?: string;
}
export default GetTemplatesQuery;
