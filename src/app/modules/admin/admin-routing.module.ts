import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Admin } from "./pages/admin/admin";
import { AdminDashboard } from "./pages/admin-dashboard/admin-dashboard";


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
            { path: "dashboard", component: AdminDashboard }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }