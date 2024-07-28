export interface LessonTemplateFormDataValidation {
  description?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  room?: string;
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
  location?: string;
  room?: string;
  price?: number;
  lessonName?: string;
  instructorName?: string;
  availability?: number;
  dayOfWeek?: number;
}

export interface LessonFormData {
  description?: string;
  startTime?: number;
  endTime?: number;
  date: string;
  location?: string;
  room?: string;
  price?: number;
  lessonName?: string;
  instructorName?: string;
}
