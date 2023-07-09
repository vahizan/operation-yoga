import Calendar from "react-calendar";
import styles from "../styles/Schedule.module.scss";
import useApi from "../hooks/useApi/useApi";
import { getSchedule } from "../hooks/api";
import React, { MouseEvent, useRef, useState } from "react";
import { Value } from "react-calendar/src/shared/types";
import { ILesson, ISession } from "./api/interfaces";
import LessonTile from "../ui/Lesson/LessonTile";
import Layout from "../ui/Layout";

const generateMaxDate = (numberOfMonthsMax: number): Date => {
  const advanceDate = new Date();
  advanceDate.setMonth(advanceDate.getMonth() + numberOfMonthsMax);
  return advanceDate;
};
export default function Lessons() {
  const currDate = new Date();
  const [date, setDate] = useState<Value>(currDate);
  const [day, setDay] = useState<number>(currDate.getDay());

  console.log("DAY", day);
  console.log("DATES", date);
  const { data, apiCallErrorMessage, apiLoading } = useApi<
    Record<string, string>,
    Array<ISession>
  >(getSchedule, [day, date], { dayOfTheWeek: day.toString() });
  const lessonsRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (value: Value) => {
    setDate(value);
    setDay((value as Date).getDay());
    if (lessonsRef.current) {
      lessonsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const renderLessons = () => {
  //   return data?.map((session) => {
  //     const lessons = session.lessons;
  //     return lessons.map((lesson) => {
  //       return (
  //         <LessonTile
  //           startTime={lesson.startTime}
  //           endTime={lesson.endTime}
  //           instructor={lesson.instructor}
  //           availability={20}
  //           location={`${lesson.location.city}, ${lesson.location.country}`}
  //           lessonName={lesson.title}
  //         />
  //       );
  //     });
  //   });
  // };

  return (
    <Layout>
      <div className={styles.scheduleContainer}>
        <h1>Lessons</h1>

        <main>
          <Calendar
            onChange={handleDateChange}
            value={date}
            defaultView={"month"}
            minDetail={"month"}
            maxDetail={"month"}
            maxDate={generateMaxDate(2)}
            minDate={new Date()}
          />
          {/*{apiCallErrorMessage && !apiLoading && (*/}
          {/*  <div>*/}
          {/*    Error retrieving lessons for this week, please try again later*/}
          {/*  </div>*/}
          {/*)}*/}
          {/*{data && !apiCallErrorMessage && !apiLoading && (*/}
          {/*  <div ref={lessonsRef} className={styles.lessonsContainer}>*/}
          {/*    {renderLessons()}*/}
          {/*  </div>*/}
          {/*)}*/}

          {/*{apiLoading && (*/}
          {/*  <div className={styles.loading}>*/}
          {/*    Please wait, finding all available packages ...*/}
          {/*  </div>*/}
          {/*)}*/}
        </main>
      </div>
    </Layout>
  );
}
