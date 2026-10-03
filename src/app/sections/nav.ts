import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NAV_LINKS } from '../data/profile';
import { scrollToId } from '../shared/scroll';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:resize)': 'onScroll()',
    '(document:keydown.escape)': 'open.set(false)',
  },
  template: `
    <div class="progress" [style.transform]="'scaleX(' + progress() + ')'" aria-hidden="true"></div>

    <header class="bar" [class.compact]="scrolled()">
      <a class="logo" href="#inicio" (click)="go('inicio', $event)" aria-label="Ir al inicio">
        LD<span class="slash">/</span>MR
      </a>

      <nav class="links" aria-label="Secciones">
        @for (link of links; track link.id; let i = $index) {
          <a [href]="'#' + link.id" [class.active]="active() === link.id" (click)="go(link.id, $event)">
            <span class="n">0{{ i + 1 }}</span>{{ link.label }}
          </a>
        }
      </nav>

      <button
        class="burger"
        type="button"
        [class.x]="open()"
        [attr.aria-expanded]="open()"
        aria-controls="menu-movil"
        [attr.aria-label]="open() ? 'Cerrar menú' : 'Abrir menú'"
        (click)="open.set(!open())"
      >
        <span></span><span></span>
      </button>
    </header>

    <div id="menu-movil" class="overlay" [class.open]="open()" [attr.aria-hidden]="!open()">
      <nav aria-label="Menú">
        @for (link of links; track link.id; let i = $index) {
          <a
            [href]="'#' + link.id"
            [style.--k]="i"
            [attr.tabindex]="open() ? 0 : -1"
            (click)="go(link.id, $event)"
          >
            <span class="n">0{{ i + 1 }}</span>{{ link.label }}
          </a>
        }
      </nav>
      <p class="mono foot">ing.luisdanielmacias&#64;gmail.com</p>
    </div>
  `,
  styleUrl: './nav.css',
})
export class Nav {
  readonly links = NAV_LINKS;
  readonly progress = signal(0);
  readonly scrolled = signal(false);
  readonly active = signal('');
  readonly open = signal(false);

  go(id: string, event: Event): void {
    this.open.set(false);
    scrollToId(id, event);
  }

  onScroll(): void {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    this.scrolled.set(window.scrollY > 40);

    let current = '';
    for (const link of this.links) {
      const el = document.getElementById(link.id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) current = link.id;
    }
    this.active.set(current);
  }
}
