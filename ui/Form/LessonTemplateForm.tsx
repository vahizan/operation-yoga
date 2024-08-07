"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { InputField } from "../Field/InputField";
import { getInstructors } from "../../hooks/api";
import SelectDropdown, { SelectOption } from "../SelectDropdown/SelectDropdown";

import { useRouter } from "next/navigation";
import { timeOptions } from "./constants";
import {
  LessonTemplateFormData,
  LessonTemplateFormDataValidation,
} from "./types";
import { validateInput } from "./helpers";
import { Currency } from "../../model/admin/enums";
import { useSession } from "next-auth/react";
import MultiSelect from "@/ui/MultiSelect/MultiSelect";
import { da } from "date-fns/locale";

interface LessonTemplateFormProps {
  instructors?: any[];
  isSubmit: boolean;
  setSubmit: React.Dispatch<SetStateAction<boolean>>;
  onSubmit: (body: any) => void;
  isReadOnly?: boolean;
  className?: string;
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

const LessonTemplateForm: React.FC<LessonTemplateFormProps> = ({
  onSubmit,
  isReadOnly = false,
  isSubmit,
  setSubmit,
}) => {
  const [instructorFetchError, setInstructorFetchError] = useState<number>();
  const [instructors, setInstructors] = useState<any[]>();
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>();
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();
  const [daysOfWeek, setDaysOfWeek] = useState<Array<number>>();
  const [currency, setCurrency] = useState<string>();

  const [errors, setErrors] = useState<
    Partial<LessonTemplateFormDataValidation>
  >({});

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    getInstructors()
      .then((res) => res.data)
      .then((data) => {
        setInstructors(data);
      })
      .catch((err) => {
        setInstructorFetchError(err.status);
      });
  }, []);

  const MIN_AVAILABILITY: number = 30;

  useEffect(() => {
    if (!selectedInstructorId && instructorFetchError === 403) {
      router.push("/403");
      return;
    }

    if (!selectedInstructorId && instructorFetchError === 401) {
      router.push("/login");
      return;
    }
  }, [instructors]);

  useEffect(() => {
    if (!isSubmit) {
      return;
    }

    const validationErrors = validateInput(
      { ...formData, startTime, endTime, daysOfWeek },
      currency as Currency,
      selectedInstructorId
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const user = session?.data?.user;
    if (!user?.email) {
      router.push("/unauthorized");
      return;
    }

    const selectedUser = instructors?.find(
      (instructor) => instructor.id === selectedInstructorId
    );

    const lessonTemplateBody: LessonTemplateFormData = {
      availability: formData?.availability || MIN_AVAILABILITY,
      endTime: endTime,
      daysOfWeek: daysOfWeek,
      startTime: startTime,
      location: formData?.location,
      room: formData?.room,
      price: formData?.price,
      createdBy: user?.id,
      currency: currency || "",
      instructor: selectedUser,
      title: formData?.lessonName || "untitled lesson template",
      description: formData?.description,
    };

    onSubmit(lessonTemplateBody);

    setSubmit(false);
    setErrors({});
  }, [isSubmit]);

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

  const [formData, setFormData] = useState<LessonTemplateFormData>({
    createdBy: "",
    currency: "",
    daysOfWeek: [0],
    description: "",
    endTime: 0,
    instructor: { name: "", id: "" },
    lessonName: "",
    location: "",
    price: 0,
    room: "",
    startTime: 0,
    title: "",
    availability: MIN_AVAILABILITY,
  });

  return (
    <form>
      <InputField
        disabled={isReadOnly}
        label={"Description"}
        name={"description"}
        value={formData.description}
        onChange={handleInputChange}
        errorMessage={errors.description}
      />
      <div>
        <SelectDropdown
          disabled={isReadOnly}
          labelValue={"Start Time"}
          options={timeOptions}
          onChange={setStartTime}
        />
        {errors.startTime && <span>{errors.startTime}</span>}
      </div>

      <div>
        <SelectDropdown
          disabled={isReadOnly}
          labelValue={"End Time"}
          options={timeOptions}
          onChange={setEndTime}
        />
        {errors.endTime && <span>{errors.endTime}</span>}
      </div>

      <div>
        <MultiSelect
          disabled={isReadOnly}
          labelValue={"Day of the Week"}
          options={dayOfWeekOptions}
          onChange={setDaysOfWeek}
        />
        {errors.daysOfWeek && <span>{errors.daysOfWeek}</span>}
      </div>

      <div>
        <InputField
          disabled={isReadOnly}
          label={"Room"}
          name={"room"}
          value={formData.room}
          onChange={handleInputChange}
          errorMessage={errors.room}
        />
      </div>
      <InputField
        disabled={isReadOnly}
        label={"Location"}
        name={"location"}
        value={formData.location}
        onChange={handleInputChange}
        errorMessage={errors.location}
      />
      <div>
        <InputField
          disabled={isReadOnly}
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
          disabled={isReadOnly}
          labelValue={"Currency"}
          options={currencyOptions}
          onChange={setCurrency}
        />
        {errors.currency && <span>{errors.currency}</span>}
      </div>
      <div>
        <InputField
          disabled={isReadOnly}
          label={"Lesson Name"}
          name={"lessonName"}
          value={formData.lessonName}
          onChange={handleInputChange}
          errorMessage={errors.lessonName}
        />
      </div>
      <div>
        <SelectDropdown
          disabled={isReadOnly}
          labelValue={"Instructor Name"}
          options={instructorsOptions || defaultOptions}
          onChange={setSelectedInstructorId}
        />
      </div>
      <div>
        <InputField
          disabled={isReadOnly}
          label={"Number of available slots"}
          type={"number"}
          name={"availability"}
          value={formData.availability}
          onChange={handleInputChange}
          errorMessage={errors.availability}
          defaultValue={MIN_AVAILABILITY}
        />
      </div>
    </form>
  );
};

export default LessonTemplateForm;
