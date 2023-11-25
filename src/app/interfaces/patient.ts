import { Doctor } from "./doctor";

export class Patient{
    id!: number;
    name!: string;
    status?: string;
    email!: string;
    height?: number;
    weight?: number;
    doctor?: Doctor;
}
export class ListingPatient{
    id!: number;
    name!: string;
    status?: string;
    lastAppointment?: Date;
    nextAppointment!: Date | "Waiting" | "Not needed";
    priority!: number;
    inpatient!: boolean; 

}