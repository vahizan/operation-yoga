"use client";

import React, { useEffect, useState } from "react";
import { getLessonTemplates } from "../../hooks/api";
import { IUser } from "../../model/User.model";
import { useSession } from "next-auth/react";
import {
  ILessonTemplate,
  ILessonTemplateWithId,
} from "../../model/admin/LessonTemplate.model";
import { useRouter } from "next/navigation";

interface LessonFormProps {
  instructors?: IUser[];
  onSubmit: (body: ILessonTemplate) => void;
}

const Templates: React.FC<LessonFormProps> = ({ onSubmit }) => {
  const [templates, setTemplates] = useState<ILessonTemplateWithId[]>();
  const [templatesFetchError, setTemplatesFetchError] = useState<string>();

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/404");
    }

    getLessonTemplates({
      limit: 0,
      page: 0,
      templateId: "",
      createdById: "",
      userId: "",
    })
      .then((data) => {
        console.log("DATA", data);
        setTemplates(data);
      })
      .catch((err) => {
        setTemplatesFetchError(err.message);
      });
  }, [session.status]);

  return (
    <div>
      <div>Title</div>
      <div>Templates</div>
      <div>Pagination</div>
    </div>
  );
};

export default Templates;
