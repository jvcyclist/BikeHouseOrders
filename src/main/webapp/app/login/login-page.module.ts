import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginpagesampleSharedModule } from 'app/shared/shared.module';
import { LOGIN_PAGE_ROUTE } from './login-page.route';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  imports: [LoginpagesampleSharedModule, RouterModule.forChild([LOGIN_PAGE_ROUTE])],
  declarations: [LoginPageComponent]
})
export class LoginpagesampleLoginPageModule {}
