export interface LessonTemplateFormDataValidation {
  description?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
  location?: string;
  price?: string;
  lessonName?: string;
  instructor?: string;
  availability?: string;
  dayOfWeek?: string;
  currency?: string;
  title?: string;
}

export interface LessonTemplateFormData {
  description?: string;
  startTime?: number;
  endTime?: number;
  room?: string;
  location?: string;
  price?: number;
  createdBy?: string;
  lessonName?: string;
  currency?: string;
  instructor: { name: string; id: string };
  availability?: number;
  dayOfWeek?: number[];
  title?: string;
}

export interface LessonFormData {
  description?: string;
  startTime?: number;
  endTime?: number;
  room?: string;
  location?: string;
  price?: number;
  lessonName?: string;
  instructorName?: string;
  availability?: number;
  dayOfWeek?: number;
}
