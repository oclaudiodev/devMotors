import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './shared/menu/menu';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Menu,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  titulo = 'devMotors';
}

