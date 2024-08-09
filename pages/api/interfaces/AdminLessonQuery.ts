import { IPaginatedQuery } from "./IPaginatedQuery";

export interface AdminLessonQuery extends IPaginatedQuery {
  userId?: string;
  id?: string;
}
export default AdminLessonQuery;
