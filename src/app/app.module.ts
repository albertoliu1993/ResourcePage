import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ResourcePageComponent } from './resource-page/resource-page.component';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {TieredMenuModule} from 'primeng/tieredmenu';
import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import { ServiceService } from '../app/resource-page/service.service';
import {ProgressBarModule} from 'primeng/progressbar';

//
import {ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationService, UserService } from './_services';
import { AuthGuard } from './_guards';
import { AlertService } from './_services/alert.service';
import { routing } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResourcePageComponent,
    LoginComponent,    
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarModule,
    ButtonModule,
    SidebarModule,
    TableModule,
    HttpClientModule,
    SplitButtonModule,
    MenuModule,
    TieredMenuModule,
    FormsModule,
    DialogModule,
    FileUploadModule,
    ProgressBarModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [ServiceService,AuthGuard,AlertService,AuthenticationService,UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
