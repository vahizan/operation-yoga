export interface LessonTemplateFormDataValidation {
  description?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
  location?: string;
  price?: string;
  lessonName?: string;
  lessonDate?: string;
  instructor?: string;
  availability?: string;
  daysOfWeek?: string;
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
  lessonDate?: Date;
  currency?: string;
  instructor: { name: string; id: string };
  availability?: number;
  daysOfWeek?: number[];
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
