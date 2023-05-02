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
