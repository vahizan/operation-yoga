import React, { useEffect, useState } from "react";
import Layout from "../../ui/Layout";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";

import { LessonTemplateFormData } from "../../ui/Form/types";
import DatepickerWithLabel from "../../ui/Calendar/DatepickerWithLabel";
import withAdmin from "../../hoc/withAdmin";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import TemplateList from "@/ui/List/TemplateList";
import axios from "axios";
import Pagination from "@/ui/Pagination/Pagination";
import { usePagination } from "@/ui/Pagination/usePagination";

const fetchUrl = `http:localhost:3000/api/admin/templates/`;
function CreateLesson({
  session,
  templates,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [lessonTemplateData, setLessonTemplateData] =
    useState<LessonTemplateFormData>(templates);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentLimit, setCurrentLimit] = useState<number>(0);
  useEffect(() => {
    if (lessonTemplateData) {
      //create lesson out
    }
  }, [lessonTemplateData]);
  return (
    <Layout>
      <div>
        <h1>Create Lesson</h1>

        <LessonTemplateForm
          onSubmit={setLessonTemplateData}
          setSubmit={setSubmit}
          isSubmit={isSubmit}
        />
        <DatepickerWithLabel
          id={"start-date-range"}
          label={"Start Time"}
          selectedDate={startTime}
          onChange={(date) => {
            if (date) setStartTime(date);
          }}
          errorMessage={""}
        />
        <DatepickerWithLabel
          id={"end-date-range"}
          label={"End Time "}
          selectedDate={new Date()}
          onChange={(date) => {
            if (date) setEndTime(date);
          }}
          errorMessage={""}
        />
        <button onClick={() => setSubmit(true)} type="submit">
          Create Lesson
        </button>
      </div>
      <div>Divider</div>
      <div className={"existingTemplate"}>
        <h2>Create from existing template</h2>
        <TemplateList data={templates} />
        <Pagination
          fetchUrl={`${fetchUrl}/${session?.user?.id}`}
          page={currentPage}
          limit={currentLimit}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const session = await getSession();
  const getTemplates = await fetch(`${fetchUrl}/${session?.user?.id}`);
  const data = await getTemplates.json();
  return { props: { session, templates: data } };
};

export default withAdmin(CreateLesson);
