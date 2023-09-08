import React, { useState } from "react";
import { InputField } from "../Field/InputField";

interface LessonFormProps {
  onSubmit: (data: LessonFormData) => void;
}

interface LessonFormData {
  description: string;
  startTime: string;
  duration: string;
  roomLocation?: string;
  price: string;
  currency: string;
  lessonName: string;
  instructorName: string;
}

const LessonTemplateForm: React.FC<LessonFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LessonFormData>({
    description: "",
    startTime: "",
    duration: "",
    roomLocation: "",
    price: "",
    currency: "",
    lessonName: "",
    instructorName: "",
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

    if (Number(formData.duration) < 1 || Number(formData.duration) > 24) {
      validationErrors.duration = "Duration should be between 1 and 24";
    }

    if (!formData.price) {
      validationErrors.price = "Price is required";
    }

    if (!formData.currency) {
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
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label={"Description"}
        name={"description"}
        value={formData.description}
        onChange={handleInputChange}
        errors={errors.description}
      />
      <div>
        <label>Start Date and Time</label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
        />
        {errors.startTime && <span>{errors.startTime}</span>}
      </div>
      <div>
        <label>Duration</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
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
        <label>Currency</label>
        <input
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
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
      <div>{/*INSTRUCTOR DROP DOWN*/}</div>
      <div>
        <label>Instructor Name</label>
        <input
          name="instructorName"
          value={formData.instructorName}
          onChange={handleInputChange}
        />
        {errors.instructorName && <span>{errors.instructorName}</span>}
      </div>
      <button type="submit">Create Lesson</button>
    </form>
  );
};

export default LessonTemplateForm;
