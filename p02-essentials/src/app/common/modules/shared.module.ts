import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { Card } from "../components/card/card";
import { ToastCustom } from "../components/toast-custom/toast-custom/toast-custom";

@NgModule({
  declarations: [ToastCustom, Card],
  imports: [BrowserModule, CommonModule, FormsModule],
  exports: [BrowserModule, CommonModule, FormsModule, ToastCustom, Card],
})
export class SharedModule {}