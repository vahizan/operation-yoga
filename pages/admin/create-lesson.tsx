import React, { FC, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Layout from "../../ui/Layout";
import { Session } from "next-auth";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";

import { LessonTemplateFormData } from "../../ui/Form/types";
import DatepickerWithLabel from "../../ui/Calendar/DatepickerWithLabel";

export function CreateLesson() {
  const sessionPromise: Promise<Session | null> = getSession();

  const [user, setUser] = useState<string | null>();
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [lessonTemplateData, setLessonTemplateData] =
    useState<LessonTemplateFormData>();
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  sessionPromise.then((session) => {
    setUser(session?.user?.name);
  });

  useEffect(() => {
    if (lessonTemplateData) {
      //create lesson out
    }
  }, [lessonTemplateData]);
  return (
    <Layout>
      <>
        <h1>Create Lesson {user}</h1>
        {user ? (
          <>
            <LessonTemplateForm
              onSubmit={setLessonTemplateData}
              setSubmit={setSubmit}
              isSubmit={isSubmit}
            />
            <DatepickerWithLabel
              id={"start-date-range"}
              label={"Start Date"}
              selectedDate={new Date()}
              onChange={(date) => setStartDate(date)}
              errorMessage={""}
            />
            <DatepickerWithLabel
              id={"end-date-range"}
              label={"End Date "}
              selectedDate={new Date()}
              onChange={(date) => setEndDate(date)}
              errorMessage={""}
            />
            <button onClick={() => setSubmit(true)} type="submit">
              Create Lesson
            </button>
          </>
        ) : (
          <div>Unauthorized User</div>
        )}
      </>
    </Layout>
  );
}

export default CreateLesson;
