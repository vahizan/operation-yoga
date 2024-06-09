import { IPaginatedQuery } from "./IPaginatedQuery";

export interface AdminLessonQuery extends IPaginatedQuery {
  userId?: string;
  id?: string;
  lessonCreatorId?: string;
}
export default AdminLessonQuery;
