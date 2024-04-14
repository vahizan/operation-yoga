"use client";

import React, { useEffect, useState } from "react";
import { getLessonTemplates } from "../../hooks/api";
import { ILessonTemplateWithId } from "../../model/admin/LessonTemplate.model";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const Templates: React.FC = () => {
  const [limits, setLimits] = useState<number>(10);
  const [templates, setTemplates] = useState<ILessonTemplateWithId[]>();
  const [templatesFetchError, setTemplatesFetchError] = useState<string>();

  const { user, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push("/404");
    }

    getLessonTemplates({
      limit: 10,
      page: 0,
      userId: user?.id as string,
    })
      .then((result) => {
        setTemplates(result?.data);
      })
      .catch((err) => {
        setTemplatesFetchError(err.message);
      });
  }, [user, error]);

  //need to do an aggregation to get createdBy data and instructor data
  return (
    <>
      <div>Title</div>
      <div>Templates</div>
      <div>
        {templates?.map((template) => {
          return (
            <>
              <div>id: {template._id}</div>
              <div>name: {template.name}</div>
              <div> price: {template.price}</div>
              <div> currency: {template.currency}</div>
              <>
                <span>createdBy:</span>
                {template.createdBy}
              </>
              <button
                onClick={() => {
                  console.log("edit");
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  console.log("delete");
                }}
              >
                Delete
              </button>
            </>
          );
        })}
      </div>
      <div>Pagination</div>
    </>
  );
};

export default Templates;
