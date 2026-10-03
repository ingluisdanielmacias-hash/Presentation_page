import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';

/** Cursor personalizado (sólo en equipos con mouse): punto + anillo que invierte colores. */
@Component({
  selector: 'app-cursor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.on]': 'enabled()',
    '[class.hidden]': 'hidden()',
    '[class.hover]': 'hovering()',
    '[class.down]': 'pressed()',
    '[class.labeled]': '!!label()',
    '(document:pointermove)': 'onMove($event)',
    '(document:pointerdown)': 'pressed.set(true)',
    '(document:pointerup)': 'pressed.set(false)',
    '(document:mouseleave)': 'hidden.set(true)',
    '(document:mouseenter)': 'hidden.set(false)',
    'aria-hidden': 'true',
  },
  template: `
    <div #dot class="dot"></div>
    <div #ring class="ring"><span>{{ label() }}</span></div>
  `,
  styles: `
    :host {
      display: none;
    }
    :host(.on) {
      display: block;
    }
    .dot,
    .ring {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 400;
      pointer-events: none;
      border-radius: 50%;
      mix-blend-mode: difference;
      will-change: transform;
    }
    .dot {
      width: 8px;
      height: 8px;
      margin: -4px 0 0 -4px;
      background: #fff;
    }
    .ring {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      margin: -22px 0 0 -22px;
      border: 1.5px solid #fff;
      transition:
        width 0.45s var(--ease),
        height 0.45s var(--ease),
        margin 0.45s var(--ease),
        background 0.3s,
        opacity 0.3s;
    }
    .ring span {
      font-family: var(--mono);
      font-size: 0.62rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: #000;
      opacity: 0;
      transition: opacity 0.2s;
    }
    :host(.hover) .ring {
      width: 76px;
      height: 76px;
      margin: -38px 0 0 -38px;
      background: #fff;
    }
    :host(.labeled) .ring {
      width: 96px;
      height: 96px;
      margin: -48px 0 0 -48px;
      background: #fff;
    }
    :host(.labeled) .ring span {
      opacity: 1;
    }
    :host(.down) .ring {
      width: 30px;
      height: 30px;
      margin: -15px 0 0 -15px;
    }
    :host(.hidden) .dot,
    :host(.hidden) .ring {
      opacity: 0;
    }
  `,
})
export class Cursor {
  readonly enabled = signal(false);
  readonly hidden = signal(true);
  readonly hovering = signal(false);
  readonly pressed = signal(false);
  readonly label = signal('');

  private readonly dot = viewChild.required<ElementRef<HTMLElement>>('dot');
  private readonly ring = viewChild.required<ElementRef<HTMLElement>>('ring');

  private mx = -100;
  private my = -100;
  private rx = -100;
  private ry = -100;
  private frame = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (!fine) return;
      this.enabled.set(true);
      document.body.classList.add('has-cursor');

      const loop = () => {
        this.rx += (this.mx - this.rx) * 0.16;
        this.ry += (this.my - this.ry) * 0.16;
        this.dot().nativeElement.style.transform = `translate3d(${this.mx}px, ${this.my}px, 0)`;
        this.ring().nativeElement.style.transform = `translate3d(${this.rx}px, ${this.ry}px, 0)`;
        this.frame = requestAnimationFrame(loop);
      };
      this.frame = requestAnimationFrame(loop);
    });

    destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.frame);
      document.body.classList.remove('has-cursor');
    });
  }

  onMove(event: PointerEvent): void {
    if (!this.enabled() || event.pointerType !== 'mouse') return;
    this.mx = event.clientX;
    this.my = event.clientY;
    this.hidden.set(false);

    const target = event.target instanceof Element ? event.target : null;
    const labeled = target?.closest<HTMLElement>('[data-cursor]');
    this.label.set(labeled?.dataset['cursor'] ?? '');
    this.hovering.set(!!target?.closest('a, button, [role="tab"]'));
  }
}
