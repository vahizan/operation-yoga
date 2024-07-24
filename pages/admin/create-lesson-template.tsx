import React, { useEffect, useState } from "react";
import Layout from "../../ui/Layout";
import LessonTemplateForm from "../../ui/Form/LessonTemplateForm";
import { createLessonTemplate } from "../../hooks/api";
import { useSession } from "next-auth/react";
import withAdmin from "../../hoc/withAdmin";

export const CreateLessonTemplate = () => {
  const [lessonTemplateData, setLessonTemplateData] = useState<any>();
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const session = useSession();

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
        <h1>Create Lesson {session?.data?.user?.name}</h1>
        {session?.data?.user?.email ? (
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

export default withAdmin(CreateLessonTemplate);
