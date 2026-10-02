import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-lading-page',
  styleUrl: './lading-page.css',
  templateUrl: './lading-page.html',
})
export class LadingPage {
  carros = [
    {
      nome: 'BMW i320',
      motor: '4.0 Turbo Flex',
      ano: 'ano xxxx',
      km: 'xx KM',
      preco: 'R$ xxxx,xx',
      imagem: 'https://img.odcdn.com.br/wp-content/uploads/2023/05/2023-fiat-topolino.jpg'
    },
    {
      nome: 'BMW i320',
      motor: '4.0 Turbo Flex',
      ano: 'ano xxxx',
      km: 'xx KM',
      preco: 'R$ xxxx,xx',
      imagem: 'https://img.odcdn.com.br/wp-content/uploads/2023/05/2023-fiat-topolino.jpg'
    },
    {
      nome: 'BMW i320',
      motor: '4.0 Turbo Flex',
      ano: 'ano xxxx',
      km: 'xx KM',
      preco: 'R$ xxxx,xx',
      imagem: 'https://img.odcdn.com.br/wp-content/uploads/2023/05/2023-fiat-topolino.jpg'
    }
  ]
}
