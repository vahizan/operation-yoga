import { IPaginatedQuery } from "./IPaginatedQuery";

export interface AdminLessonTemplateQuery extends IPaginatedQuery {
  lessonCreatorId?: string;
  userId?: string;
  ids?: string | string[];
}
export default AdminLessonTemplateQuery;
