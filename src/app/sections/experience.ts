import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCE } from '../data/profile';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  readonly jobs = EXPERIENCE;

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
