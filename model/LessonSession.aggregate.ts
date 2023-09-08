import { LESSON_MODEL_NAME } from "./Lesson.model";

export const LESSONS_SESSION_INFO = "lessonSessionInfo";

export const lessonSession = (dayOfTheWeek: string) => {
  const expressions = [
    { $eq: ["$dayOfTheWeek", "$$sessionDay"] },
    { $eq: ["$startTime", "$$sessionStart"] },
    { $eq: ["$endTime", "$$sessionEnd"] },
    { $eq: ["$dayOfTheWeek", Number(dayOfTheWeek) - 1] },
  ];
  if (!dayOfTheWeek) {
    expressions.pop();
  }
  return [
    {
      $lookup: {
        from: LESSON_MODEL_NAME,
        let: {
          sessionDay: "$dayOfTheWeek",
          sessionStart: "$startTime",
          sessionEnd: "$endTime",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: expressions,
              },
            },
          },
        ],
        as: "lessons",
      },
    },
  ];
};

export default lessonSession;
