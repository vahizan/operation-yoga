"use client";

import React, { useEffect, useState } from "react";
import { InputField } from "../Field/InputField";
import { getInstructors } from "../../hooks/api";
import { IUser, IUserEssential, IUserReadOnly } from "../../model/User.model";
import SelectDropdown, { SelectOption } from "../SelectDropdown/SelectDropdown";
import { useSession } from "next-auth/react";
import { ILessonTemplate } from "../../model/admin/LessonTemplate.model";
import { useRouter } from "next/navigation";
import { timeOptions } from "./constants";
import { DefaultSession, Session } from "next-auth";
import { ISODateString } from "next-auth/src/core/types";
import { SessionWithId } from "../../types/SessionWithId";

interface LessonFormProps {
  instructors?: IUser[];
  onSubmit: (body: ILessonTemplate) => void;
}
interface LessonFormDataValidation {
  description?: string;
  startTime?: string;
  endTime?: string;
  roomLocation?: string;
  price?: string;
  lessonName?: string;
  instructorName?: string;
  availability?: string;
  dayOfWeek?: string;
  currency?: string;
}
interface LessonFormData {
  description?: string;
  startTime?: number;
  endTime?: number;
  roomLocation?: string;
  price?: number;
  lessonName?: string;
  instructorName?: string;
  availability?: number;
  dayOfWeek?: number;
}

const dayOfWeekOptions = [
  { name: "Select an option", value: -1 },
  { name: "Sunday", value: 7 },
  { name: "Monday", value: 1 },
  { name: "Tuesday", value: 2 },
  { name: "Wednesday", value: 3 },
  { name: "Thursday", value: 4 },
  { name: "Friday", value: 5 },
  { name: "Saturday", value: 6 },
];

const CurrencyMap = {
  USD: "USD",
  EUR: "EUR",
  INR: "INR",
  GBP: "GBP",
  AUD: "AUD",
  CAD: "CAD",
};

const currencyOptions = [
  { name: "Select a currency", value: undefined },
  { name: "Indian Rupee", value: CurrencyMap.INR },
  { name: "US Dollar", value: CurrencyMap.USD },
  { name: "Euro", value: CurrencyMap.EUR },
  { name: "British Pound", value: CurrencyMap.GBP },
  { name: "Australian Dollar", value: CurrencyMap.AUD },
  { name: "Canadian Dollar", value: CurrencyMap.CAD },
];

const LessonTemplateForm: React.FC<LessonFormProps> = ({ onSubmit }) => {
  const [instructorFetchError, setInstructorFetchError] = useState<number>();
  const [instructors, setInstructors] = useState<IUser[]>();
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>();
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();
  const [dayOfWeek, setDayOfWeek] = useState<number>();
  const [currency, setCurrency] = useState<string>();
  const [isSubmit, setSubmit] = useState<boolean>();

  const [errors, setErrors] = useState<Partial<LessonFormDataValidation>>({});

  const session = useSession() as unknown as { data: SessionWithId };
  const router = useRouter();

  useEffect(() => {
    getInstructors()
      .then((res) => res.data)
      .then((data) => {
        console.log("DATA", data);
        setInstructors(data);
      })
      .catch((err) => {
        setInstructorFetchError(err.status);
        console.log("err", err);
      });
  }, []);

  const MIN_AVAILABILITY: number = 30;

  useEffect(() => {
    if (!selectedInstructorId && instructorFetchError === 403) {
      setSubmit(false);

      router.push("/403");
      return;
    }

    if (!selectedInstructorId && instructorFetchError === 401) {
      setSubmit(false);

      router.push("/login");
      return;
    }
  }, [instructors]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setSubmit(false);
      return;
    }

    if (!isSubmit) {
      setSubmit(false);

      return;
    }

    if (!session?.data?.user?.email) {
      setSubmit(false);

      router.push("/404");
      return;
    }

    const selectedUser = instructors?.find(
      (instructor) => instructor.id === selectedInstructorId
    ) as IUserReadOnly;

    const lessonTemplateBody: ILessonTemplate = {
      availability: formData?.availability || MIN_AVAILABILITY,
      endTime: endTime || 1,
      dayOfWeek: 1,
      startTime: startTime || 0,
      location: formData?.roomLocation,
      price: formData?.price || 0,
      createdBy: {
        _id: session.data?.user?.id,
        name: session?.data?.user?.name,
        email: session?.data?.user?.email,
      } as IUserEssential,
      currency: currency || "",
      instructor: selectedUser,
      name: formData?.lessonName || "default-name",
    };

    onSubmit(lessonTemplateBody);

    setSubmit(false);
  }, [isSubmit, errors]);

  const defaultOptions: SelectOption[] | undefined = [
    { name: "Select an option", value: undefined },
  ];
  const toInstructorOptions: SelectOption[] | undefined = instructors?.map(
    (instructor) => {
      return {
        name: instructor.name,
        value: instructor.id,
      };
    }
  );
  const instructorsOptions = toInstructorOptions
    ? defaultOptions.concat(toInstructorOptions)
    : defaultOptions;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formData, setFormData] = useState<LessonFormData>({
    availability: MIN_AVAILABILITY,
  });

  const validateInput = () => {
    const errorValues: LessonFormDataValidation = {};

    if (!formData.description) {
      errorValues.description = "Description is required";
    }

    if (!startTime) {
      errorValues.startTime =
        "Start time is required and should not be in the past";
    }

    if (!endTime) {
      errorValues.endTime = "End time is required";
    }

    if (startTime && endTime && Number(startTime) > Number(endTime)) {
      errorValues.startTime =
        "Invalid duration, start time cannot be greater than end time";
    }

    if (!dayOfWeek) {
      errorValues.dayOfWeek =
        "Please specify the day of the week the lesson will take place";
    }

    if (!formData.price) {
      errorValues.price = "Price is required";
    }

    if (!currency) {
      errorValues.currency = "Currency is required";
    }

    if (!formData.lessonName) {
      errorValues.lessonName = "Lesson name is required";
    }

    if (!selectedInstructorId) {
      errorValues.instructorName = "Instructor name is required";
    }

    if (Object.keys(errorValues).length > 0) {
      setErrors(errorValues);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateInput()) {
      setSubmit(true);
    }
  };

  return (
    <form>
      <InputField
        label={"Description"}
        name={"description"}
        value={formData.description}
        onChange={handleInputChange}
        errorMessage={errors.description}
      />
      <div>
        <SelectDropdown
          labelValue={"Start Time"}
          options={timeOptions}
          onChange={setStartTime}
        />
        {errors.startTime && <span>{errors.startTime}</span>}
      </div>

      <div>
        <SelectDropdown
          labelValue={"End Time"}
          options={timeOptions}
          onChange={setEndTime}
        />
        {errors.endTime && <span>{errors.endTime}</span>}
      </div>

      <div>
        <SelectDropdown
          labelValue={"Day of the Week"}
          options={dayOfWeekOptions}
          onChange={setDayOfWeek}
        />
        {errors.dayOfWeek && <span>{errors.dayOfWeek}</span>}
      </div>

      <div>
        <InputField
          label={"Room/Location"}
          name={"roomLocation"}
          value={formData.roomLocation}
          onChange={handleInputChange}
          errorMessage={errors.roomLocation}
        />
      </div>
      <div>
        <InputField
          name={"price"}
          label={"Price"}
          type={"number"}
          value={formData.price}
          onChange={handleInputChange}
        />

        {errors.price && <span>{errors.price}</span>}
      </div>
      <div>
        <SelectDropdown
          labelValue={"Currency"}
          options={currencyOptions}
          onChange={setCurrency}
        />
        {errors.currency && <span>{errors.currency}</span>}
      </div>
      <div>
        <InputField
          label={"Lesson Name"}
          name={"lessonName"}
          value={formData.lessonName}
          onChange={handleInputChange}
          errorMessage={errors.lessonName}
        />
      </div>
      <div>
        <SelectDropdown
          labelValue={"Instructor Name"}
          options={instructorsOptions || defaultOptions}
          onChange={setSelectedInstructorId}
        />
      </div>
      <div>
        <InputField
          label={"Number of available slots"}
          type={"number"}
          name={"availability"}
          value={formData.availability}
          onChange={handleInputChange}
          errorMessage={errors.availability}
          defaultValue={MIN_AVAILABILITY}
        />
      </div>
      <button onClick={handleSubmit} type="submit">
        Create Lesson
      </button>
    </form>
  );
};

export default LessonTemplateForm;
