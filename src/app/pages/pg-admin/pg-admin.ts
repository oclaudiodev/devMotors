import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pg-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pg-admin.html',
  styleUrls: ['./pg-admin.css'],
})
export class PgAdmin {}