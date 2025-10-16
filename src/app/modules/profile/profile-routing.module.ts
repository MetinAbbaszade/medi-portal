import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Profilecomponent } from "./pages/profilecomponent/profilecomponent"
import { Profile } from "./pages/profile/profile";

const routes: Routes = [
    {
        path: "",
        redirectTo: 'dashboard',
        pathMatch: "full"
    },
    {
        path: "",
        component: Profilecomponent,
        children: [
            { path: "dashboard", component: Profile }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }