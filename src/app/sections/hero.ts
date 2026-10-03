import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { PROFILE } from '../data/profile';
import { prefersReducedMotion, scrollToId } from '../shared/scroll';
import { SplitText } from '../shared/split-text';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SplitText],
  host: { '(window:scroll)': 'onScroll()' },
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  readonly ready = input(false);

  readonly p = PROFILE;
  readonly typed = signal('');
  readonly time = signal('--:--:--');
  readonly shift = signal(0);


  constructor() {
    const destroyRef = inject(DestroyRef);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let clock: ReturnType<typeof setInterval> | undefined;

    afterNextRender(() => {
      // Reloj en vivo con la hora de Tijuana
      const fmt = new Intl.DateTimeFormat('es-MX', {
        timeZone: this.p.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const update = () => this.time.set(fmt.format(new Date()));
      update();
      clock = setInterval(update, 1000);

      // Máquina de escribir con los roles
      const roles = this.p.roles;
      if (prefersReducedMotion()) {
        this.typed.set(roles[0]);
        return;
      }
      let r = 0;
      let c = 0;
      let deleting = false;
      const step = () => {
        const word = roles[r];
        c += deleting ? -1 : 1;
        this.typed.set(word.slice(0, c));
        let wait = deleting ? 32 : 70;
        if (!deleting && c === word.length) {
          deleting = true;
          wait = 1900;
        } else if (deleting && c === 0) {
          deleting = false;
          r = (r + 1) % roles.length;
          wait = 380;
        }
        timers.push(setTimeout(step, wait));
      };
      timers.push(setTimeout(step, 2200));
    });

    destroyRef.onDestroy(() => {
      timers.forEach(clearTimeout);
      if (clock) clearInterval(clock);
    });
  }

  onScroll(): void {
    if (window.scrollY < window.innerHeight * 1.2) this.shift.set(window.scrollY);
  }

  go(id: string, event: Event): void {
    scrollToId(id, event);
  }
}
