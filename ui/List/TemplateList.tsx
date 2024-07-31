import { LessonTemplateFormData } from "@/ui/Form/types";

export interface Props {
  data: LessonTemplateFormData[];
}

function TemplateList<T, K>({ data }: Props) {
  return (
    <div>
      {data.map((item) => {
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
  );
}

export default TemplateList;
