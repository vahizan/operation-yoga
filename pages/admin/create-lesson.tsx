import React, { FC, useEffect, useState } from "react";
import Layout from "../../ui/Layout";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";

import { LessonTemplateFormData } from "../../ui/Form/types";
import DatepickerWithLabel from "../../ui/Calendar/DatepickerWithLabel";
import { useUser } from "@auth0/nextjs-auth0/client";

export function CreateLesson() {
  const { user } = useUser();
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [lessonTemplateData, setLessonTemplateData] =
    useState<LessonTemplateFormData>();
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  useEffect(() => {
    if (lessonTemplateData) {
      //create lesson out
    }
  }, [lessonTemplateData]);
  return (
    <Layout>
      <>
        <h1>Create Lesson {user?.name}</h1>
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
