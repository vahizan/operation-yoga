"use client";

import React, { useEffect, useState } from "react";
import { getInstructorLessonSchedule } from "../../hooks/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ILesson } from "../api/interfaces";

const LessonSchedule: React.FC = () => {
  const [limits, setLimits] = useState<number>(10);
  const [instructorLessons, setInstructorLessons] = useState<ILesson[]>();
  const [instructorLessonsError, setInstructorLessonsError] =
    useState<string>();

  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/404");
    }

    getInstructorLessonSchedule({
      limit: 10,
      page: 0,
    })
      .then((result) => {
        setInstructorLessons(result?.data);
      })
      .catch((err) => {
        setInstructorLessonsError(err.message);
      });
  }, [session.status]);

  //need to do an aggregation to get createdBy data and instructor data
  return (
    <>
      <div>Lessons</div>
      <div>
        {instructorLessons?.map((lesson) => {
          return (
            <>
              <div>name: {lesson.title}</div>
            </>
          );
        })}
      </div>
      <div>Pagination</div>
    </>
  );
};

export default LessonSchedule;
