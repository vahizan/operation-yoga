import { LessonTemplateFormData } from "@/ui/Form/types";

interface Props {
  item: LessonTemplateFormData;
}

export const TemplateListItem = ({ item }: Props) => {
  return (
    <div className={"template-item"}>
      <div> title: {item.title}</div>
      <div> price: {item.price}</div>
      <div> currency: {item.currency}</div>
      <div> instructor: {item.instructor.name}</div>
      <div>
        <span>Days of week</span>
        {item.daysOfWeek && item.daysOfWeek.map((day) => <span>{day}</span>)}
      </div>
      <>
        <span> createdBy:</span>
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
};

export default TemplateListItem;
