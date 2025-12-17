import { Department } from "./department";

export interface Student {
  idStudent?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string; // LocalDate => string
  address: string;
  department?: Department;

}