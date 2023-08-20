import { USER_MODEL_NAME } from "./User.model";
import { LESSON_TEMPLATE_MODEL_NAME } from "./admin/LessonTemplate.model";

export const LessonAggregate = (userId: string) => {
  return [
    {
      $lookup: {
        from: USER_MODEL_NAME,
        let: {
          userId: "_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: { $eq: ["$instructor", userId] },
              },
            },
          },
        ],
        as: "instructor",
      },
    },
    {
      $lookup: {
        from: LESSON_TEMPLATE_MODEL_NAME,
        let: {
          lessonId: "_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: { $eq: ["$info", "$$lessonId"] },
              },
            },
          },
        ],
        as: "info",
      },
    },
  ];
};

export default LessonAggregate;
