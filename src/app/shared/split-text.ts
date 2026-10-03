import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Divide un texto en letras que suben desde una máscara, una tras otra. */
@Component({
  selector: 'app-split-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.play]': 'play()' },
  template: `<span class="sr-only">{{ text() }}</span><span class="mask" aria-hidden="true">@for (c of chars(); track $index) {<span class="ch" [style.--i]="$index + offset()">{{ c }}</span>}</span>`,
  styles: `
    :host {
      display: inline-block;
    }
    .mask {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      padding-top: 0.14em;
      margin-top: -0.14em;
      vertical-align: top;
    }
    .ch {
      display: inline-block;
      transform: translateY(112%) rotate(8deg);
      transform-origin: 0 100%;
      transition: transform 1.15s var(--ease);
      transition-delay: calc(var(--i) * 38ms + var(--base, 0ms));
    }
    :host(.play) .ch {
      transform: none;
    }
  `,
})
export class SplitText {
  readonly text = input.required<string>();
  readonly play = input(false);
  readonly offset = input(0);

  readonly chars = computed(() => Array.from(this.text()).map((c) => (c === ' ' ? ' ' : c)));
}
