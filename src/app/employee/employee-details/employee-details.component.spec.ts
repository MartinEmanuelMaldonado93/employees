import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { EmployeeService } from '../employee.service';
import { EmployeeDetailsComponent } from './employee-details.component';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDetailsComponent],
      imports: [HttpClientModule, AppRoutingModule, BrowserModule, FormsModule],
      providers: [HttpClient, HttpHandler, Router, EmployeeService],
    });
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
