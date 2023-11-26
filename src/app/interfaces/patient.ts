import { Doctor } from "./doctor";

export class Patient{
    PatientID?: number;
    Name!: string;
    ContactNumber!: string;
    Email!: string;
    Address!: string;
    AffectedOrgan!: string;
    NotificationPreference!: string;
    TreatmentStatus?: string;
    Height?: number;
    Weight?: number;
    Doctor?: Doctor | string;
    BirthDate!: Date | string;
    Inpatient!: boolean;
}
export class ListingPatient{
    PatientID!: number;
    Name!: string;
    TreatmentStatus?: string;
    LastAppointment!: Date | string;
    NextAppointment!: Date | string;
    Priority?: number;
    Inpatient?: boolean; 

}