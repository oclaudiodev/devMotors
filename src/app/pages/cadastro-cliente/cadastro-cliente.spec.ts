import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroCliente } from './cadastro-cliente';

describe('CadastroCliente', () => {
  let component: CadastroCliente;
  let fixture: ComponentFixture<CadastroCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCliente],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
