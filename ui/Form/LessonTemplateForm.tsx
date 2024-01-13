import React, { useEffect, useState } from "react";
import { InputField } from "../Field/InputField";
import { createLessonTemplate, getInstructors } from "../../hooks/api";
import { IUser } from "../../model/User.model";
import SelectDropdown, { SelectOption } from "../SelectDropdown/SelectDropdown";
import { useSession } from "next-auth/react";

interface LessonFormProps {
  instructors?: IUser[];
}

interface LessonFormData {
  description: string;
  startTime: number;
  endTime: number;
  roomLocation?: string;
  price: number;
  lessonName: string;
  instructorName: string;
  availability: number;
  dayOfWeek: number;
}

const timeOptions = [
  { name: "12 AM", value: 0 },
  { name: "12:30 AM", value: 0.5 },
  { name: "1 AM", value: 1 },
  { name: "1:30 AM", value: 1.5 },
  { name: "2 AM", value: 1 },
  { name: "2:30 AM", value: 2.5 },
  { name: "3 AM", value: 3 },
  { name: "3:30 AM", value: 3.5 },
  { name: "4 AM", value: 4 },
  { name: "4:30 AM", value: 4.5 },
  { name: "5 AM", value: 5 },
  { name: "5:30 AM", value: 5.5 },
  { name: "6 AM", value: 6 },
  { name: "6:30 AM", value: 6.5 },
  { name: "7 AM", value: 7 },
  { name: "7:30 AM", value: 7.5 },
  { name: "8 AM", value: 8 },
  { name: "8:30 AM", value: 8.5 },
  { name: "9 AM", value: 9 },
  { name: "9:30 AM", value: 9.5 },
  { name: "10 AM", value: 10 },
  { name: "10:30 AM", value: 10.5 },
  { name: "11 AM", value: 11 },
  { name: "11:30 AM", value: 11.5 },
  { name: "12 PM", value: 12 },
  { name: "12:30 PM", value: 12.5 },
  { name: "1 PM", value: 13 },
  { name: "1:30 PM", value: 13.5 },
  { name: "2 PM", value: 14 },
  { name: "2:30 PM", value: 14.5 },
  { name: "3 PM", value: 15 },
  { name: "3:30 PM", value: 15.5 },
  { name: "4 PM", value: 16 },
  { name: "4:30 PM", value: 16.5 },
  { name: "5 PM", value: 17 },
  { name: "5:30 PM", value: 17.5 },
  { name: "6 PM", value: 18 },
  { name: "6:30 PM", value: 18.5 },
  { name: "7 PM", value: 19 },
  { name: "7:30 PM", value: 19.5 },
  { name: "8 PM", value: 20 },
  { name: "8:30 PM", value: 20.5 },
  { name: "9 PM", value: 21 },
  { name: "9:30 PM", value: 21.5 },
  { name: "10 PM", value: 22 },
  { name: "10:30 PM", value: 22.5 },
  { name: "11 PM", value: 23 },
  { name: "11:30 PM", value: 23.5 },
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
  { name: "Indian Rupee", value: CurrencyMap.INR },
  { name: "US Dollar", value: CurrencyMap.USD },
  { name: "Euro", value: CurrencyMap.EUR },
  { name: "British Pound", value: CurrencyMap.GBP },
  { name: "Australian Dollar", value: CurrencyMap.AUD },
  { name: "Canadian Dollar", value: CurrencyMap.CAD },
];

const LessonTemplateForm: React.FC<LessonFormProps> = () => {
  const [instructorFetchError, setInstructorFetchError] = useState<string>();
  const [instructors, setInstructors] = useState<IUser[]>();
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [currency, setCurrency] = useState<string>();
  const [isSubmit, setSubmit] = useState<boolean>();
  const session = useSession();
  console.log("selectedUser", instructors);

  useEffect(() => {
    getInstructors()
      .then((res) => res.data)
      .then((data) => setInstructors(data))
      .catch((err) => setInstructorFetchError(err.message));
  }, []);

  const MIN_AVAILABILITY: number = 30;

  useEffect(() => {
    if (
      !startTime ||
      !endTime ||
      !currency ||
      !formData.price ||
      !formData?.roomLocation ||
      !formData?.dayOfWeek
    ) {
      return;
    }
    if (!session?.data?.user?.email) {
      //redirect to 404
      return;
    }
    if (!selectedUser) {
      //getting instructors failed
      return;
    }

    const val = createLessonTemplate({
      availability: MIN_AVAILABILITY,
      endTime: formData?.endTime,
      dayOfWeek: 1,
      startTime: formData?.startTime,
      location: formData?.roomLocation,
      price: formData?.price,
      createdBy: session.data?.user?.email,
      currency,
      instructor: selectedUser,
      name: formData?.lessonName,
    }).then;

    setSubmit(false);
  }, [isSubmit]);

  const instructorsOptions: SelectOption[] | undefined = instructors?.map(
    (instructor) => {
      return {
        name: instructor.name,
        value: instructor,
      };
    }
  );

  const [formData, setFormData] = useState<LessonFormData>({
    description: "",
    startTime: -1,
    endTime: -1,
    roomLocation: "",
    price: -1,
    dayOfWeek: -1,
    lessonName: "",
    instructorName: "",
    availability: MIN_AVAILABILITY,
  });

  const [errors, setErrors] = useState<Partial<LessonFormData>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors: Partial<LessonFormData> = {};

    if (!formData.description) {
      validationErrors.description = "Description is required";
    }

    // Validate start time (should not be in the past)
    const currentTime = new Date().toISOString().split(".")[0]; // Remove milliseconds
    if (!formData.startTime || formData.startTime < currentTime) {
      validationErrors.startTime =
        "Start time is required and should not be in the past";
    }

    if (Number(startTime) > Number(endTime)) {
      validationErrors.duration =
        "Invalid duration, start time cannot be greater than end time";
    }

    if (!formData.price) {
      validationErrors.price = "Price is required";
    }

    if (!currency) {
      validationErrors.currency = "Currency is required";
    }

    if (!formData.lessonName) {
      validationErrors.lessonName = "Lesson name is required";
    }

    if (!formData.instructorName) {
      validationErrors.instructorName = "Instructor name is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setSubmit(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {errors.duration && <span>{errors.duration}</span>}
      </div>

      <div>
        <SelectDropdown
          labelValue={"End Time"}
          options={timeOptions}
          onChange={setEndTime}
        />
        {errors.duration && <span>{errors.duration}</span>}
      </div>

      <div>
        <label>Room/Location</label>
        <input
          name="roomLocation"
          value={formData.roomLocation}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
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
        <label>Lesson Name</label>
        <input
          name="lessonName"
          value={formData.lessonName}
          onChange={handleInputChange}
        />
        {errors.lessonName && <span>{errors.lessonName}</span>}
      </div>
      <div>
        <SelectDropdown
          labelValue={"Instructor Name"}
          options={instructorsOptions || []}
          onChange={setSelectedUser}
        />
      </div>
      <div>
        <InputField label={"Number of available slots"} type={"number"} />
      </div>
      <button onClick={() => setSubmit(true)} type="submit">
        Create Lesson
      </button>
    </form>
  );
};

export default LessonTemplateForm;
