import { Component, effect, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeselectableDirective } from './deselectable.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    DeselectableDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formGroup = new FormGroup({
    radio: new FormControl(),
  });

  radioValueChanges = toSignal(
    this.formGroup.controls.radio.valueChanges,
    { initialValue: this.formGroup.controls.radio.value }
  );

  disabled = model<boolean>(false);

  constructor() {
    effect(() => {
      const disabled = this.disabled();
      if (disabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
    });
  }

  deselect(event: MouseEvent, control: FormControl): void {
    if (!control.disabled) {
      const element = event.target as Element;
      const value = element.getAttribute('value');
  
      if (value === control.value) {
        control.reset();
      }
    } 
  }
}
