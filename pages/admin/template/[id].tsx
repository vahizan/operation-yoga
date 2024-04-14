import { FC } from "react";
import { ILessonTemplateWithId } from "../../../model/admin/LessonTemplate.model";
import { timeOptions } from "../../../ui/Form/constants";

const convertToDayOfWeek: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const getTime = (time: number): { name: string; value: number } | undefined => {
  const found = timeOptions.filter((option) => option.value === time);
  return found ? found[0] : undefined;
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
      Id <span>{id}</span>
      Name <span>{name}</span>
      Instructor <span>{instructor?.name}</span>
      Template Created By <span>{createdBy?.name}</span>
      Start time <span>{getTime(startTime)?.name}</span>
      End time <span>{getTime(endTime)?.name}</span>
      Price <span>{price}</span>
      Location <span>{location}</span>
      Currency <span>{currency}</span>
      Availability <span>{availability}</span>
      Day of the week <span>{convertToDayOfWeek[dayOfWeek]}</span>
    </div>
  );
};

export default Template;
