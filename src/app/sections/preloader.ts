import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  output,
  signal,
} from '@angular/core';
import { prefersReducedMotion } from '../shared/scroll';

/** Pantalla de carga: contador 0→100 y cortina que sube. */
@Component({
  selector: 'app-preloader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!gone()) {
      <div class="pre" [class.out]="done()" aria-hidden="true">
        <div class="pre__top mono">
          <span>Luis Daniel Macías</span>
          <span>Portafolio — CV</span>
        </div>
        <div class="pre__count">{{ count() }}<span>%</span></div>
        <div class="pre__bar"><span [style.transform]="'scaleX(' + count() / 100 + ')'"></span></div>
      </div>
    }
  `,
  styles: `
    .pre {
      position: fixed;
      inset: 0;
      z-index: 300;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.5rem var(--pad) 2rem;
      background: var(--paper);
      color: var(--ink);
      clip-path: inset(0 0 0 0);
      transition: clip-path 1.1s var(--ease-in-out);
    }
    .pre.out {
      clip-path: inset(0 0 100% 0);
    }
    .pre__top {
      display: flex;
      justify-content: space-between;
    }
    .pre__count {
      font-family: var(--display);
      font-size: clamp(7rem, 30vw, 26rem);
      line-height: 0.8;
      font-variant-numeric: tabular-nums;
      transition: transform 0.9s var(--ease-in-out);
    }
    .pre.out .pre__count {
      transform: translateY(-30%);
    }
    .pre__count span {
      font-size: 0.3em;
      vertical-align: top;
      margin-left: 0.1em;
    }
    .pre__bar {
      height: 3px;
      background: rgba(10, 10, 10, 0.12);
    }
    .pre__bar span {
      display: block;
      height: 100%;
      background: var(--ink);
      transform-origin: 0 50%;
      transition: transform 0.15s linear;
    }
  `,
})
export class Preloader {
  readonly finished = output<void>();
  readonly count = signal(0);
  readonly done = signal(false);
  readonly gone = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    const timers: ReturnType<typeof setTimeout>[] = [];

    afterNextRender(() => {
      document.body.classList.add('is-loading');
      const fast = prefersReducedMotion();

      const finish = () => {
        this.done.set(true);
        document.body.classList.remove('is-loading');
        timers.push(setTimeout(() => this.finished.emit(), fast ? 0 : 350));
        timers.push(setTimeout(() => this.gone.set(true), fast ? 0 : 1200));
      };

      if (fast) {
        this.count.set(100);
        finish();
        return;
      }

      const tick = () => {
        const next = Math.min(100, this.count() + Math.ceil(Math.random() * 4));
        this.count.set(next);
        if (next < 100) {
          timers.push(setTimeout(tick, 16 + Math.random() * 22));
        } else {
          timers.push(setTimeout(finish, 250));
        }
      };
      timers.push(setTimeout(tick, 200));
    });

    destroyRef.onDestroy(() => {
      timers.forEach(clearTimeout);
      document.body.classList.remove('is-loading');
    });
  }
}
