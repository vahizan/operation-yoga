export interface IArticlePost {
  name: string;
  description: string;
  id: number;
}

export enum PackageType {
  YOGA = "Yoga",
  COOKING = "Cooking",
  LANGUAGE = "Language",
  MEDIATION = "Meditation",
  RETREAT = "Retreat",
  TEACHER_TRAINING = "Teacher Training",
}

export interface IPackage {
  title: string;
  description: string;
  price: number;
  currency: string;
  type: PackageType;
  isIndiaExclusive: boolean;
}

interface Location {
  city: string;
  country: string;
  state?: string;
  district?: string;
}

export interface ILesson {
  title: string;
  startTime: Date;
  endTime: Date;
  location: Location;
  instructor: string;
  currentScheduleTime?: Date;
  availability?: number;
}
export interface ISession {
  startTime: Date;
  endTime: Date;
  type: PackageType;
  lessons: Array<ILesson>;
  dayOfTheWeek: number;
}
export interface ILessonQuery {
  startTime?: Date;
  endTime?: Date;
  dayOfTheWeek: string;
}
