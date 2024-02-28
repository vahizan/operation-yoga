import { FC } from "react";
import { ILessonTemplateWithId } from "../../../model/admin/LessonTemplate.model";

export const Template: FC<ILessonTemplateWithId> = ({
  id,
  instructor,
  createdBy,
  startTime,
  endTime,
  name,
  price,
  location,
  currency,
  availability,
  dayOfWeek,
}) => {
  return (
    <div>
      <div>
        Id <span>{id}</span>
        Name <span>{name}</span>
        Instructor <span>{instructor.name}</span>
        Template Created By <span>{createdBy.name}</span>
        Start time <span>{startTime}</span>
        End time <span>{endTime}</span>
        Price <span>{price}</span>
      </div>
    </div>
  );
};

export default Template;
