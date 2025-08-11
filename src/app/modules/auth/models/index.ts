export interface Permission {
    id: number;
    name: string;
}

export interface Module {
    id: number;
    name: string;
    permissions: Permission[];
}

export interface Role {
    id: number;
    name: string;
    modules: Module[];
}

export interface PatientUser {
    id?: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    role?: Role;
}

export const DEFAULT_PATIENT_ROLE = {
    id: 3,
    name: 'Patient',
    modules: [
        {
            id: 301,
            name: 'Appointments',
            permissions: [{ id: 6, name: 'Read' }]
        },
        {
            id: 302,
            name: 'Medical Records',
            permissions: [{ id: 6, name: 'Read' }]
        }
    ]
};

export function createNewPatientUser(data: PatientUser) {
    return {
        ...data,
        id: Date.now(),
        role: DEFAULT_PATIENT_ROLE
    };
}