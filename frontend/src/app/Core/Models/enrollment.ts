import { Status } from "./status";
import { Student } from "./student";

export interface Enrollment {
  idEnrollment?: number;
  enrollmentDate: string; // LocalDate => string (ISO)
  grade: number;
  status: Status;
  student?: Student;  // optionnel pour éviter les cycles
}