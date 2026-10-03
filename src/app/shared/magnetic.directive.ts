import { Directive, ElementRef, inject, input, signal } from '@angular/core';

/** Efecto "magnético": el elemento sigue ligeramente al puntero. */
@Directive({
  selector: '[magnetic]',
  host: {
    '(pointermove)': 'move($event)',
    '(pointerleave)': 'reset()',
    '[style.translate]': 'offset()',
  },
})
export class MagneticDirective {
  readonly strength = input(0.35);
  readonly offset = signal('0px 0px');

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  move(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    const r = this.el.nativeElement.getBoundingClientRect();
    const x = (event.clientX - (r.left + r.width / 2)) * this.strength();
    const y = (event.clientY - (r.top + r.height / 2)) * this.strength();
    this.offset.set(`${x.toFixed(1)}px ${y.toFixed(1)}px`);
  }

  reset(): void {
    this.offset.set('0px 0px');
  }
}
