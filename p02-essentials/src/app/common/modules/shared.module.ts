import { NgModule } from "@angular/core";

import { Card } from "../components/card/card";
import { ToastCustom } from "../components/toast-custom/toast-custom/toast-custom";

@NgModule({
  declarations: [ToastCustom, Card],
  imports: [],
  exports: [ToastCustom, Card],
})
export class SharedModule {}