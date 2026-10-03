import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { About } from './sections/about';
import { Competencies } from './sections/competencies';
import { Contact } from './sections/contact';
import { Cursor } from './sections/cursor';
import { Education } from './sections/education';
import { Expand } from './sections/expand';
import { Experience } from './sections/experience';
import { Hero } from './sections/hero';
import { Nav } from './sections/nav';
import { Preloader } from './sections/preloader';
import { Skills } from './sections/skills';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Preloader, Cursor, Nav, Hero, Expand, About, Experience, Skills, Competencies, Education, Contact],
  templateUrl: './app.html',
})
export class App {
  /** Se vuelve true cuando termina la pantalla de carga y arrancan las animaciones del hero. */
  readonly ready = signal(false);
}
