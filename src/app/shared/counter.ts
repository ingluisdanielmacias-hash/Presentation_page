import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { prefersReducedMotion } from './scroll';

/** Número que cuenta desde 0 cuando entra en pantalla. */
@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ value() }}{{ suffix() }}`,
  styles: `:host { font-variant-numeric: tabular-nums; }`,
})
export class Counter implements OnInit, OnDestroy {
  readonly to = input.required<number>();
  readonly suffix = input('');
  readonly duration = input(1800);
  readonly value = signal(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  private frame = 0;

  ngOnInit(): void {
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      this.value.set(this.to());
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.observer?.disconnect();
          this.animate();
        }
      },
      { threshold: 0.6 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  private animate(): void {
    const start = performance.now();
    const target = this.to();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / this.duration());
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      this.value.set(Math.round(target * eased));
      if (t < 1) this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }
}
