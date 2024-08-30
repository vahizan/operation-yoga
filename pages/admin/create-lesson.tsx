import React, { useEffect, useState } from "react";
import Layout from "../../ui/Layout";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";
import { LessonTemplateFormData } from "../../ui/Form/types";
import DatepickerWithLabel from "../../ui/Calendar/DatepickerWithLabel";
import withAdmin from "../../hoc/withAdmin";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  PreviewData,
} from "next";
import TemplateList from "@/ui/List/TemplateList";
import Pagination from "@/ui/Pagination/Pagination";
import { auth } from "../../auth";
import { ParsedUrlQuery } from "querystring";
import { Session } from "next-auth";
import axios, { AxiosError, AxiosResponse } from "axios";

const fetchUrl = `${process.env.BASE_URL}/api/admin/templates`;

function CreateLesson({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [lessonTemplateData, setLessonTemplateData] = useState<
    LessonTemplateFormData[] | undefined
  >();
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentLimit, setCurrentLimit] = useState<number>(0);

  useEffect(() => {
    if (session?.user) {
      axios
        .get(`${fetchUrl}/${session?.user?.id}`)
        .then((res: AxiosResponse<LessonTemplateFormData[]>) => {
          setLessonTemplateData(res.data);
          console.log("res", res.data);
        })
        .catch((e) => {
          const error = e as AxiosError;
          console.error(e);
        });
    }
  }, [session]);

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
      {lessonTemplateData && (
        <div className={"existingTemplate"}>
          <h2>Create from existing template</h2>
          <TemplateList data={lessonTemplateData} />
          <Pagination
            fetchUrl={`${fetchUrl}/${session?.user?.id}`}
            page={currentPage}
            limit={currentLimit}
          />
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps = (async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const session = await auth(context);
  return {
    props: {
      session,
    },
  };
}) as GetServerSideProps<{
  session: Session;
}>;

export default withAdmin(CreateLesson);
