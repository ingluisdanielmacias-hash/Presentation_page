import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { prefersReducedMotion } from '../shared/scroll';

interface Token {
  t: string;
  k?: 'key' | 'str' | 'kw' | 'cm' | 'fn';
}

/**
 * "Scroll expansion": versión Angular (sin dependencias) del efecto
 * ScrollExpandMedia. Un panel crece hasta ocupar toda la pantalla mientras
 * haces scroll, el título se separa hacia los lados con mix-blend-difference
 * y el fondo se desvanece.
 *
 * A diferencia del componente original de React, NO secuestra la rueda del
 * mouse ni el touch: usa una sección alta con un contenedor `sticky`, así que
 * el scroll nativo, el teclado y la barra de desplazamiento siguen funcionando.
 */
@Component({
  selector: 'app-expand',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:resize)': 'onScroll()',
    '[style.--p]': 'progress()',
    '[class.done]': 'expanded()',
  },
  templateUrl: './expand.html',
  styleUrl: './expand.css',
})
export class Expand {
  readonly progress = signal(0);
  readonly expanded = computed(() => this.progress() > 0.94);

  /** Código que se "escribe" conforme el panel se expande. */
  readonly code: Token[][] = [
    [{ t: 'const ', k: 'kw' }, { t: 'ingeniero', k: 'fn' }, { t: ' = {' }],
    [{ t: '  nombre', k: 'key' }, { t: ': ' }, { t: "'Luis Daniel Macías'", k: 'str' }, { t: ',' }],
    [{ t: '  rol', k: 'key' }, { t: ': [' }, { t: "'Supervisor'", k: 'str' }, { t: ', ' }, { t: "'DevOps'", k: 'str' }, { t: ', ' }, { t: "'Full Stack'", k: 'str' }, { t: '],' }],
    [{ t: '  frontend', k: 'key' }, { t: ': [' }, { t: "'Angular'", k: 'str' }, { t: ', ' }, { t: "'Vue.js'", k: 'str' }, { t: ', ' }, { t: "'Ionic'", k: 'str' }, { t: '],' }],
    [{ t: '  backend', k: 'key' }, { t: ': [' }, { t: "'Node.js'", k: 'str' }, { t: ', ' }, { t: "'Express'", k: 'str' }, { t: ', ' }, { t: "'C#'", k: 'str' }, { t: '],' }],
    [{ t: '  datos', k: 'key' }, { t: ': [' }, { t: "'MongoDB'", k: 'str' }, { t: ', ' }, { t: "'PostgreSQL'", k: 'str' }, { t: '],' }],
    [{ t: '  infra', k: 'key' }, { t: ': [' }, { t: "'Docker'", k: 'str' }, { t: ', ' }, { t: "'Linux'", k: 'str' }, { t: ', ' }, { t: "'GPU'", k: 'str' }, { t: '],' }],
    [{ t: '  ia', k: 'key' }, { t: ': [' }, { t: "'Claude'", k: 'str' }, { t: ', ' }, { t: "'Gemini'", k: 'str' }, { t: ', ' }, { t: "'ChatGPT'", k: 'str' }, { t: '],' }],
    [{ t: '  equipo', k: 'key' }, { t: ': ' }, { t: "'4 a 6 desarrolladores'", k: 'str' }, { t: ',' }],
    [{ t: '};' }],
    [{ t: '' }],
    [{ t: 'deploy', k: 'fn' }, { t: '(ingeniero); ' }, { t: '// ✓ listo para producción', k: 'cm' }],
  ];

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private frame = 0;

  constructor() {
    afterNextRender(() => {
      if (prefersReducedMotion()) {
        this.progress.set(1);
        return;
      }
      this.measure();
    });
  }

  /** Línea visible cuando el progreso supera su umbral (efecto de tecleo). */
  lineOn(i: number): boolean {
    return this.progress() > 0.12 + i * 0.065;
  }

  onScroll(): void {
    if (this.frame || prefersReducedMotion()) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.measure();
    });
  }

  private measure(): void {
    const section = this.el.nativeElement.querySelector<HTMLElement>('.xp');
    if (!section) return;
    const r = section.getBoundingClientRect();
    const travel = r.height - window.innerHeight;
    const p = travel > 0 ? -r.top / travel : 1;
    this.progress.set(Math.round(Math.max(0, Math.min(1, p)) * 1000) / 1000);
  }
}
