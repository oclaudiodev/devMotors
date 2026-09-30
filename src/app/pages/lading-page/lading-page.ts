import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  imports: [],
  selector: 'app-lading-page',
  styleUrl: './lading-page.css',
  templateUrl: './lading-page.html',
})
export class LadingPage {

  constructor(private router: Router) { };

  irParaRegistro() {
    this.router.navigate(['/registro']);
  }
}

