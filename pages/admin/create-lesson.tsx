import { FC, useState } from "react";
import { getSession } from "next-auth/react";
import Layout from "../../ui/Layout";
import { Session } from "next-auth";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";
import { createLessonTemplate } from "../../hooks/api";

export function CreateLesson() {
  const sessionPromise: Promise<Session | null> = getSession();

  const [user, setUser] = useState<string | null>();

  sessionPromise.then((session) => {
    setUser(session?.user?.name);
  });

  return (
    <Layout>
      <>
        <h1>Create Lesson {user}</h1>
        {user ? (
          <>
            <div>Lesson Date:</div>
            <div>Start Time:</div>
            <div>End Time:</div>
            <div>Spaces left:</div>
            <div>Instructor:</div>
            <div>Price:</div>
            <div>Currency</div>
            <div>Lesson Name</div>
          </>
        ) : (
          <div>Unauthorized User</div>
        )}
      </>
    </Layout>
  );
}

export default CreateLesson;
