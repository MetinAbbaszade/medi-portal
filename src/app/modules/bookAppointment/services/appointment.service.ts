// src/app/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppointmentData } from '../models/appointment.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private appointmentSubject = new BehaviorSubject<AppointmentData>({
        department: '',
        hospital: '',
        doctor: '',
        date: '',
        time: '',
        concern: '',
    });

    appointment$ = this.appointmentSubject.asObservable();

    updateAppointment(data: Partial<AppointmentData>) {
        const current = this.appointmentSubject.value;
        this.appointmentSubject.next({ ...current, ...data });
    }
}
