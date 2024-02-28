import { FC, useState } from "react";
import { getSession } from "next-auth/react";
import Layout from "../../ui/Layout";
import { Session } from "next-auth";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";
import { createLessonTemplate } from "../../hooks/api";

export function CreateLessonTemplate() {
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
          <LessonTemplateForm onSubmit={createLessonTemplate} />
        ) : (
          <div>Unauthorized</div>
        )}
      </>
    </Layout>
  );
}

export default CreateLessonTemplate;