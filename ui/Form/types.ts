export interface LessonTemplateFormDataValidation {
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

export interface LessonTemplateFormData {
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
