// src/app/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { url } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IHospital } from '../../hospital/modules/data';

export interface IDoctor {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    specialization: string;
    experienceYears: number;
    rating: number;
    hospitalId: string;
    departmentId: string;
}



@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private hospitalUrl = url.baseUrl + 'hospitals';
    private doctorsUrl = url.baseUrl + 'doctors';
    private departmentsUrl = url.baseUrl + 'departments'


    constructor(
        private http: HttpClient
    ) { }

    fetchHospitalsByDepartment(department_id: string) {
        return this.http.get<IHospital[]>(this.hospitalUrl)
            .pipe(
                map((res: IHospital[]) =>
                    res.filter((data: IHospital) => data.departments.find((department) => department.id === department_id))
                )
            )
    }

    fetchDoctorsByHospitalsAndDepartment(hospital_id: string, department_id: string) {
        return this.http.get<IDoctor[]>(this.doctorsUrl)
            .pipe(
                map((res: IDoctor[]) => (
                    res.filter((doctor: IDoctor) => (
                        doctor.departmentId === department_id && doctor.hospitalId === hospital_id
                    ))
                ))
            )
    }

    fetchDepartmentsData(){
        return this.http.get(this.departmentsUrl)
    }
}
