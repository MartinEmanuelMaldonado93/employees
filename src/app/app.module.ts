import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './employee/employee.module';
import { DummyComponent } from './dummy/dummy.component';
import { CoreModule } from './core.module';
import { SceneComponent } from './scene/scene.component';
import { SceneRoutingModule } from './scene/scene-routing.module';

@NgModule({
  declarations: [AppComponent, DummyComponent, SceneComponent],
  imports: [
    BrowserModule,
    // HttpClientModule,
    // FormsModule,
    SceneRoutingModule
    // AppRoutingModule,
    // EmployeeModule,
    // CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
