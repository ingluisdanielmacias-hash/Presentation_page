import { Directive, ElementRef, OnDestroy, OnInit, inject, input, signal } from '@angular/core';

/**
 * Revela un elemento cuando entra al viewport.
 * Variantes vía el valor del atributo: reveal | reveal="left" | reveal="scale" | reveal="clip"
 * Los estilos están en src/styles.css (.reveal / .is-in).
 */
@Directive({
  selector: '[reveal]',
  host: {
    class: 'reveal',
    '[class.is-in]': 'visible()',
    '[style.--reveal-delay]': 'revealDelay() + "ms"',
  },
})
export class RevealDirective implements OnInit, OnDestroy {
  readonly revealDelay = input(0);
  readonly visible = signal(false);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.visible.set(true);
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.visible.set(true);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    // Con clip-path al 100% el propio elemento cuenta como invisible para el
    // IntersectionObserver, así que en la variante "clip" se observa su contenedor.
    const host = this.el.nativeElement;
    const target = host.getAttribute('reveal') === 'clip' ? (host.parentElement ?? host) : host;
    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
