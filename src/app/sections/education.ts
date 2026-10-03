import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COURSES, EDUCATION } from '../data/profile';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  readonly columns = [
    { title: 'Formación académica', items: EDUCATION },
    { title: 'Cursos y reconocimientos', items: COURSES },
  ];
}
