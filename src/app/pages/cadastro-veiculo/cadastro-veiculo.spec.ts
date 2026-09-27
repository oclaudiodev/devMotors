import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVeiculo } from './cadastro-veiculo';

describe('CadastroVeiculo', () => {
  let component: CadastroVeiculo;
  let fixture: ComponentFixture<CadastroVeiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroVeiculo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroVeiculo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
