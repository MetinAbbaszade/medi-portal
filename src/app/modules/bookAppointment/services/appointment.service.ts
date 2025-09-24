// src/app/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { url } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IHospitalResponse } from '../../hospital/modules/data';
import { IDepartmentResponse } from '../pages/bookAppointment/book-appointment';
import { ApiResponse, IResponseSchedule } from '../models/doctor.model';
import { AppointmentPayload, AppointmentRecord } from '../models/appointment.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private baseUrl = url.baseUrl;

    constructor(
        private http: HttpClient
    ) { }

    fetchHospitalsByDepartment(department_id: string) {
        return this.http.get<IHospitalResponse>(this.baseUrl + 'api/hospital/' + department_id)
    }

    fetchDoctorsByHospitalsAndDepartment(hospital_id: string, department_id: string) {
        return this.http.get<ApiResponse>(this.baseUrl + 'api/doctors/' + hospital_id + '/departments/' + department_id + '/doctors')
    }

    fetchDoctorScheduleByDate(
        doctor_id: string = "0314a3ec-b146-4cd7-b6bd-31e3536a6e5c",
        date: string = "2025-09-22"
    ) {
        const body = { doctor_id, date };
        return this.http.post<IResponseSchedule>(this.baseUrl + 'api/doctors/getTimeSlots', body);
    }


    fetchDepartmentsData() {
        return this.http.get<IDepartmentResponse>(this.baseUrl + 'api/departments')
    }

    submitAppointment(payload: AppointmentPayload) {
        return this.http.post<AppointmentRecord>(this.baseUrl + 'api/appointments', payload)
    }
}
