export interface IHospital {
    id: string;
    name: string;
    type: string;
    image: string;
    description: string;
    address: Address;
    contact: Contact;
    capacity: Capacity;
    departments: Department[];
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface Contact {
    phone: string;
    email: string;
    website: string;
}

export interface Capacity {
    beds: number;
    icuBeds: number;
    emergencyCapacity: number;
}

export interface Department {
    id: string;
    name: string;
    head: string;
}
