import React, { FC, useEffect, useState } from "react";
import Layout from "../../ui/Layout";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";

import { LessonTemplateFormData } from "../../ui/Form/types";
import DatepickerWithLabel from "../../ui/Calendar/DatepickerWithLabel";
import withAdmin from "../../hoc/withAdmin";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";

function CreateLesson({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [lessonData, setLessonData] = useState<LessonTemplateFormData>();
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  useEffect(() => {
    if (lessonData) {
      //create lesson out
    }
  }, [lessonData]);
  return (
    <Layout>
      <>
        <h1>Create Lesson</h1>
        {session?.user ? (
          <div>
            <div className={"top"}>
              <span>Select from existing templates</span>
            </div>
            <div className={"bottom"}>
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
            </div>
          </div>
        ) : (
          <div>Unauthorized User</div>
        )}
      </>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const session = await getSession();
  return { props: { session } };
};

export default withAdmin(CreateLesson);
