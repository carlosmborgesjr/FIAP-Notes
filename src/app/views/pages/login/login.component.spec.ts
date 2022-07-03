import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
]

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let injector: TestBed;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    //criando o componente
    fixture = TestBed.createComponent(LoginComponent);
    //pegando a instância do componente criado
    component = fixture.componentInstance;
    //aplicando as modunças no dom
    fixture.detectChanges();

    injector = getTestBed();
    router = injector.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home', () => {
    //preparação
    spyOn(router, 'navigate');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('#btnLogin');

    //execução
    button.click();

    //verificação
    expect(router.navigate).toHaveBeenCalledWith(["home"]);
  });
});