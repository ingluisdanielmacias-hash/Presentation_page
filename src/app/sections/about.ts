import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { EXPERIENCE, PROFILE, UNIQUE_SKILLS } from '../data/profile';
import { RevealDirective } from '../shared/reveal.directive';
import { Counter } from '../shared/counter';

interface Word {
  text: string;
  mark: boolean;
}

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, Counter],
  host: { '(window:scroll)': 'onScroll()', '(window:resize)': 'onScroll()' },
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly p = PROFILE;

  /** La frase se "enciende" palabra por palabra conforme haces scroll. */
  readonly words: Word[] = PROFILE.statement.split(' ').map((w) => ({
    text: w.replace(/^\*/, ''),
    mark: w.startsWith('*'),
  }));
  readonly lit = signal(0);

  readonly stats = [
    { value: 5, suffix: '+', label: 'Años de experiencia en desarrollo' },
    { value: 6, suffix: '', label: 'Desarrolladores liderados a la vez' },
    { value: EXPERIENCE.length, suffix: '', label: 'Puestos en la industria' },
    { value: UNIQUE_SKILLS.length, suffix: '+', label: 'Tecnologías y herramientas' },
  ];

  private readonly statement = viewChild.required<ElementRef<HTMLElement>>('statement');

  onScroll(): void {
    const el = this.statement().nativeElement;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = (vh * 0.9 - r.top) / (r.height + vh * 0.35);
    const clamped = Math.max(0, Math.min(1, progress));
    this.lit.set(Math.round(clamped * this.words.length * 1.1));
  }
}
