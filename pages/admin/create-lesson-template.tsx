import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Layout from "../../ui/Layout";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";
import { createLessonTemplate } from "../../hooks/api";
import { ILessonTemplate } from "../../model/admin/LessonTemplate.model";
import { SessionWithId } from "../../types/SessionWithId";

export const CreateLessonTemplate = () => {
  const [user, setUser] = useState<string | null>();
  const [lessonTemplateData, setLessonTemplateData] =
    useState<ILessonTemplate>();
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const session = useSession() as unknown as { data: SessionWithId };

  useEffect(() => {
    if (lessonTemplateData) {
      createLessonTemplate(lessonTemplateData).catch((err) =>
        setErrorMessage(err.message)
      );
    }
  }, [lessonTemplateData]);

  useEffect(() => {
    if (!session?.data?.user?.email) {
      setUser(session?.data?.user?.name);
      return;
    }
  }, [session]);
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
            <button onClick={() => setSubmit(true)} type="submit">
              Create Lesson Template
            </button>
            {errorMessage && <div>{errorMessage}</div>}
          </>
        ) : (
          <div>Unauthorized</div>
        )}
      </>
    </Layout>
  );
};

export default CreateLessonTemplate;
