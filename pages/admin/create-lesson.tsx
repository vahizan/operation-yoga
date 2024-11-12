import React, { useEffect, useState } from "react";
import Layout from "../../ui/Layout";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";
import {
  LessonTemplateFormData,
  LessonTemplateFormDataValidation,
} from "../../ui/Form/types";
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
import SelectDropdown from "@/ui/SelectDropdown/SelectDropdown";
import { timeOptions } from "@/ui/Form/constants";
import { validateInput } from "@/ui/Form/helpers";

const fetchUrl = `${process.env.BASE_URL}/api/admin/templates`;

function CreateLesson({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [savedLessonTemplates, setSavedLessonTemplates] = useState<
    LessonTemplateFormData[] | undefined
  >();
  const [lessonTemplateData, setLessonTemplateData] =
    useState<LessonTemplateFormData>();
  const [lessonDate, setLessonDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentLimit, setCurrentLimit] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();
  const [errors, setErrors] = useState<
    Partial<LessonTemplateFormDataValidation>
  >({});
  useEffect(() => {
    if (session?.user) {
      axios
        .get(`${fetchUrl}/${session?.user?.id}`)
        .then((res: AxiosResponse<LessonTemplateFormData[]>) => {
          setSavedLessonTemplates(res.data);
          console.log("res", res.data);
        })
        .catch((e) => {
          const error = e as AxiosError;
          console.error(e);
        });
    }
  }, [session]);

  useEffect(() => {
    if (!isSubmit || !lessonTemplateData) {
      return;
    }
    validateInput(lessonTemplateData, undefined, undefined);
  }, [isSubmit]);

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
          id={"lesson-date"}
          label={"Lesson Date"}
          selectedDate={lessonDate}
          onChange={(date) => {
            if (date) setLessonDate(date);
          }}
          errorMessage={errors?.lessonDate}
        />
        <div>
          <SelectDropdown
            labelValue={"Start Time"}
            options={timeOptions}
            onChange={setStartTime}
          />
          {errors.startTime && <span>{errors.startTime}</span>}
        </div>

        <div>
          <SelectDropdown
            labelValue={"End Time"}
            options={timeOptions}
            onChange={setEndTime}
          />
          {errors.endTime && <span>{errors.endTime}</span>}
        </div>

        <button onClick={() => setSubmit(true)} type="submit">
          Create Lesson
        </button>
      </div>

      <div>Divider</div>
      {savedLessonTemplates && (
        <div className={"existingTemplate"}>
          <h2>Create from existing template</h2>
          <TemplateList data={savedLessonTemplates} />
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
