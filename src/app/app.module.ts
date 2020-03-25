import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import {ShareModule} from './shared/share.module';
import {AuthInterceptor} from './shared/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


registerLocaleData(ruLocale, 'ru');

const INTERCEPROT_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [INTERCEPROT_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
