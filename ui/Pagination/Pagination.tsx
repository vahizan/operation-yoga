import { usePagination } from "@/ui/Pagination/usePagination";
import { FC } from "react";
import { InputField } from "@/ui/Field/InputField";

export interface LessonTemplate {
  description?: string;
  startTime?: number;
  endTime?: number;
  room?: string;
  location?: string;
  price?: number;
  createdBy?: string;
  lessonName?: string;
  currency?: string;
  instructor: { name: string; id: string };
  availability?: number;
  daysOfWeek?: number[];
  title?: string;
}

interface Props {
  fetchUrl: string;
  page: number;
  limit: number;
}

export const Pagination: FC<Props> = ({ fetchUrl, page, limit }) => {
  const { previous, errorMessage, next, data, updatePage, currentPage } =
    usePagination<LessonTemplate[]>({
      fetchUrl,
      page,
      limit,
    });

  return (
    <div>
      <div>
        {data?.map((item) => {
          return (
            <div className={"template-item"}>
              <div>title: {item.title}</div>
              <div> price: {item.price}</div>
              <div> currency: {item.currency}</div>
              <div> instructor: {item.instructor.name}</div>
              <>
                <span>createdBy:</span>
                {item.createdBy}
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
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={previous}>Previous</button>
        <InputField
          label={"currentPage"}
          onChange={(e) => updatePage(Number(e.target.value))}
        >
          {currentPage}
        </InputField>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
