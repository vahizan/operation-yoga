import React, { useEffect, useState } from "react";
import Layout from "../../ui/Layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";
import { createLessonTemplate } from "../../hooks/api";
import { ILessonTemplate } from "../../model/admin/LessonTemplate.model";

export const CreateLessonTemplate = () => {
  const [lessonTemplateData, setLessonTemplateData] =
    useState<ILessonTemplate>();
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { user: userProfile } = useUser();

  useEffect(() => {
    if (lessonTemplateData) {
      createLessonTemplate(lessonTemplateData).catch((err) =>
        setErrorMessage(err.message)
      );
    }
  }, [lessonTemplateData]);

  return (
    <Layout>
      <>
        <h1>Create Lesson {userProfile?.name}</h1>
        {userProfile?.email && userProfile?.email_verified ? (
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
