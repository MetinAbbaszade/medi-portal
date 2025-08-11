import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-errors',
  templateUrl: './error-handling.html',
  imports: [
    CommonModule,
    NgIf
  ],
  styleUrls: [
    './error-handling.css'
  ]
})
export class ErrorHandling {
  @Input() control!: AbstractControl | null;
}
