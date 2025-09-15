export interface IRes {
    filteredHospitals: IHospital[]
}

export interface IHospital {
    id: string;
    name: string;
    type: string;
    image: string;
    description: string;
    adresses: Address[];
    contacts: Contact;
    capacities: Capacity[];
    departments: Department[];
    specialties: string[];
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    county: string;
}

export interface Contact {
    phone: string;
    email: string;
    website: string;
}

export interface Capacity {
    beds: number;
    icu_beds: number;
    emergency_capacity: number;
}

export interface Department {
    icon: string
    name: string;
    head: string;
}
