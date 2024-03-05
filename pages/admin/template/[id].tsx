import { FC } from "react";
import { ILessonTemplateWithId } from "../../../model/admin/LessonTemplate.model";

const convertToDayOfWeek: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const toTime: Record<string, string> = {
  "0": "12:00 AM",
  "0.5": "12:30 AM",
};
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
        Location <span>{location}</span>
        Currency <span>{currency}</span>
        Availability <span>{availability}</span>
        Day of the week <span>{convertToDayOfWeek[dayOfWeek]}</span>
      </div>
    </div>
  );
};

export default Template;
