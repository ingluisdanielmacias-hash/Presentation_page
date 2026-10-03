import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { PROFILE } from '../data/profile';
import { MagneticDirective } from '../shared/magnetic.directive';
import { RevealDirective } from '../shared/reveal.directive';
import { scrollToId } from '../shared/scroll';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, MagneticDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly p = PROFILE;
  readonly year = new Date().getFullYear();
  readonly copied = signal(false);
  readonly bigWord = Array.from('¿Hablamos?');

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.p.email);
      this.copied.set(true);
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.copied.set(false), 2200);
    } catch {
      window.location.href = `mailto:${this.p.email}`;
    }
  }

  top(event: Event): void {
    scrollToId('inicio', event);
  }
}
