import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILLS } from '../data/profile';
import { RevealDirective } from '../shared/reveal.directive';
import { scrollToId } from '../shared/scroll';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  readonly groups = SKILLS;

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  go(event: Event): void {
    scrollToId('contacto', event);
  }
}
