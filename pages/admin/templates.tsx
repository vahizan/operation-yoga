"use client";

import React, { useEffect, useState } from "react";
import { getLessonTemplates } from "../../hooks/api";
import { useSession } from "next-auth/react";
import { ILessonTemplateWithId } from "../../model/admin/LessonTemplate.model";
import { useRouter } from "next/navigation";

const Templates: React.FC = () => {
  const [limits, setLimits] = useState<number>(10);
  const [templates, setTemplates] = useState<ILessonTemplateWithId[]>();
  const [templatesFetchError, setTemplatesFetchError] = useState<string>();

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/404");
    }

    getLessonTemplates({
      limit: 10,
      page: 0,
      userId: session.data?.user?.id,
    })
      .then((result) => {
        setTemplates(result?.data);
      })
      .catch((err) => {
        setTemplatesFetchError(err.message);
      });
  }, [session.status]);

  //need to do an aggregation to get createdBy data and instructor data
  return (
    <div>
      <div>Title</div>
      <div>Templates</div>
      <div>
        {templates?.map((template) => {
          return (
            <div>
              <div>id: {template._id}</div>
              <div>name: {template.name}</div>
              <div>price: {template.price}</div>
              <div>currency: {template.currency}</div>
              <div>createdBy: {template.createdBy}</div>
            </div>
          );
        })}
      </div>
      <div>Pagination</div>
    </div>
  );
};

export default Templates;
