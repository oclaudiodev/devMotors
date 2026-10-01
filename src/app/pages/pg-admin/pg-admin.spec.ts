import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PgAdmin } from './pg-admin';

describe('PgAdmin', () => {
  let component: PgAdmin;
  let fixture: ComponentFixture<PgAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(PgAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
