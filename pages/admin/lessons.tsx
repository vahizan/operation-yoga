"use client";

import React, { useEffect, useState } from "react";
import { getLessonTemplates } from "../../hooks/api";
import { useSession } from "next-auth/react";
import { ILessonTemplateWithId } from "../../model/admin/LessonTemplate.model";
import { useRouter } from "next/navigation";
import { ILesson } from "../api/interfaces";

const Lessons: React.FC = () => {
  const [limits, setLimits] = useState<number>(10);
  const [lessons, setLessons] = useState<ILesson[]>();
  const [templatesFetchError, setTemplatesFetchError] = useState<string>();

  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/404");
    }

    // getLessons({
    //   limit: 10,
    //   page: 0,
    //   userId: session.data?.user?.id,
    // })
    //   .then((result) => {
    //     setLessons(result?.data);
    //   })
    //   .catch((err) => {
    //     setLessonsError(err.message);
    //   });
  }, [session.status]);

  //need to do an aggregation to get createdBy data and instructor data
  return (
    <>
      <div>Lessons</div>
      <div>
        {lessons?.map((lesson) => {
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

export default Lessons;
