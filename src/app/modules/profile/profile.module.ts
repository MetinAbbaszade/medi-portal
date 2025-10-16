import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileRoutingModule } from "./profile-routing.module";
import { Profile } from "./pages/profile/profile";
import { Profilecomponent } from "./pages/profilecomponent/profilecomponent";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProfileRoutingModule
    ]
})
export class ProfileModule { }