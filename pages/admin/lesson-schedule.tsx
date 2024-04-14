"use client";

import React, { useEffect, useState } from "react";
import { getInstructorLessonSchedule } from "../../hooks/api";
import { useRouter } from "next/navigation";
import { ILesson } from "../api/interfaces";
import { useUser } from "@auth0/nextjs-auth0/client";

const LessonSchedule: React.FC = () => {
  const [limits, setLimits] = useState<number>(10);
  const [instructorLessons, setInstructorLessons] = useState<ILesson[]>();
  const [instructorLessonsError, setInstructorLessonsError] =
    useState<string>();

  const { error } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (error) {
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
  }, [error]);

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
