import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[deselectable]',
  standalone: true
})
export class DeselectableDirective {
  private control = inject(NgControl);

  @HostListener('click', ['$event.target']) onClick(element: Element): void {
    if (!this.control.disabled) {
      const tag = element.tagName.toLowerCase();
      const type = element.getAttribute('type');

      if (tag === 'input' && type === 'radio') {
        const value = element.getAttribute('value');

        if (value === this.control.value) {
          this.control.reset();
        }
      }
    }
  }
}
