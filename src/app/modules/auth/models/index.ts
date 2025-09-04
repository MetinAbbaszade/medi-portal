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
    iat: number;
    role?: Role;
}