// In standalone Angular components, you cannot directly import pipes or directives that are not themselves marked as standalone: true.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        TranslateModule
    ]
})
export class SharedTranslateModule { }