export class Patient{
    id!: number;
    name!: string;
    status?: string;
    email!: string;
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