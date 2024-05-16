"use client";

import React, { useEffect, useState } from "react";
import { getLessonTemplates } from "../../hooks/api";
import { ILessonTemplateWithId } from "../../model/admin/LessonTemplate.model";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Templates: React.FC = () => {
  const [limits, setLimits] = useState<number>(10);
  const [templates, setTemplates] = useState<ILessonTemplateWithId[]>();
  const [templatesFetchError, setTemplatesFetchError] = useState<string>();

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.data) {
      router.push("/404");
    }

    getLessonTemplates({
      limit: 10,
      page: 0,
      userId: session?.data?.user?.id as string,
    })
      .then((result) => {
        setTemplates(result?.data);
      })
      .catch((err) => {
        setTemplatesFetchError(err.message);
      });
  }, [session]);

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
