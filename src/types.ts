export interface Course {
  id: number;
  name: string;
  heading: string;
  students: Student[];
}

export interface Student {
  user_id: string;
  name?: string;
  email?: string;
}
