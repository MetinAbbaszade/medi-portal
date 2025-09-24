export interface AppointmentRecord {
    id: string;         
    user_id: string;     
    date: string;        
    time: string;        
    note?: string;
    hospital_id: string;
    department_id: string;
    doctor_id: string;
}



export interface AppointmentPayload {
    date: string;        
    time: string;        
    note?: string;       
    hospital_id: string; 
    department_id: string; 
    doctor_id: string;   
}
