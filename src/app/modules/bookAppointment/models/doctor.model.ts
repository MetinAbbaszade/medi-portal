export interface ApiResponse {
    response: Person[];
}

export interface Person {
    id: string;
    name: string;
    surname: string;
    gender: string;
    date_of_birth: string;
    email: string;
    number: string;
    adress: string;
    experience: string;
    picture: string;
    biography: string;
    created_at: string; //
    updated_at: string;
    status: string;
    hospitals: Hospital[];
    departments: Department[];
    schedules: Schedule[];
    specialties: Specialty[];
}

export interface Hospital {
    id: string;
    name: string;
    type: string;
    image: string;
    description: string;
    adresses: Address[];
    capacities: Capacity[];
    contacts: Contact[];
    departments: DepartmentDetail[];
    specialties: Specialty[];
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    county: string;
}

export interface Capacity {
    beds: number;
    icu_beds: number;
    emergency_capacity: number;
}

export interface Contact {
    phone: string;
    email: string;
    website: string;
}

export interface Department {
    id: string;
    name: string;
    icon: string;
}

export interface DepartmentDetail extends Department {
    head: string;
}

export interface IResponseSchedule {
    slots: Slots[]
}

export interface Slots {
    time: string;
    available: boolean
}

export interface Schedule {
    id: string;
    day_of_week: string;
    start_time: string;
    end_time: string;
    doctor_id?: string;
    slot_interval?: number;
}

export interface Specialty {
    id: number;
    name: string;
}
