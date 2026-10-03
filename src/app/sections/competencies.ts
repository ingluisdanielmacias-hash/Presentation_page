import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { COMPETENCIES } from '../data/profile';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-competencies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  templateUrl: './competencies.html',
  styleUrl: './competencies.css',
})
export class Competencies {
  readonly groups = COMPETENCIES;
  readonly selected = signal(0);
  readonly current = computed(() => this.groups[this.selected()]);

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  /** Navegación con flechas entre pestañas (accesibilidad). */
  onKey(event: KeyboardEvent): void {
    const n = this.groups.length;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.selected.update((i) => (i + 1) % n);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.selected.update((i) => (i - 1 + n) % n);
    } else {
      return;
    }
    const tabs = (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="tab"]');
    tabs[this.selected()]?.focus();
  }
}
