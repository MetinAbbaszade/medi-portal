import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Admin } from "./pages/admin/admin";
import { AdminDashboard } from "./pages/admin-dashboard/admin-dashboard";
import { AdminHospital } from "./pages/admin-hospital/admin-hospital/admin-hospital";
import { AdminPanelDoctor } from "./pages/admin-doctor/admin-panel-doctor/admin-panel-doctor";
import { AdminPanelPatient } from "./pages/admin-patient/admin-panel-patient/admin-panel-patient";
import { ManageAppointments } from "./pages/admin-appointments/manage-appointments/manage-appointments";

const routes: Routes = [
    {
        path: "",
        redirectTo: 'dashboard',
        pathMatch: "full"
    },
    {
        path: "",
        component: Admin,
        children: [
            { path: "dashboard", component: AdminDashboard },
            { path: "hospitals", component: AdminHospital },
            { path: "doctors", component: AdminPanelDoctor },
            { path: "patients", component: AdminPanelPatient },
            { path: "appointments", component: ManageAppointments }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }