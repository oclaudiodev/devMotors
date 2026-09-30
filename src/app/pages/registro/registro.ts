import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  imports: [],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {

  constructor(private router: Router) {}
  voltarParaLogin() {
    this.router.navigate(['/login']);
}
}
