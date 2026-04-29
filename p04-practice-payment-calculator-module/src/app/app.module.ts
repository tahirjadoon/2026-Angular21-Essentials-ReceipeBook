import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { HeaderComponent } from './common/components/header.component/header.component';
import { UserInputComponent } from './user-input.component/user-input.component';
import { InvestmentResultsComponent } from './investment-results.component/investment-results.component';



@NgModule({
  declarations: [App, HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  imports: [BrowserModule, CommonModule, FormsModule],
  bootstrap: [App],
})
export class AppModule {}
