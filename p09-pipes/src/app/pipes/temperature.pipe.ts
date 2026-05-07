import { Pipe, PipeTransform, Type } from "@angular/core";
import { TEMP_UNITS, TempUnit } from "../models/temperature.model";

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform{

  transform(value: string | number | null, inputType: TempUnit, outputType?: TempUnit) {
    
    if(!value){
      return value;
    }

    let val: number;
    if(typeof value === 'string'){
      val = parseFloat(value);
    }else{
      val = value;
    }

    let output: number;
    if(inputType == TEMP_UNITS.cel && outputType == TEMP_UNITS.far){
      output = val * (9/5) + 32;
    }
    else if(inputType == TEMP_UNITS.far && outputType == TEMP_UNITS.cel){
      output = (val - 32) * (5/9);
    }
    else{
      output = val;
    }

    let symbol: '°F' | '°C';
    if (!outputType) {
      symbol = inputType === TEMP_UNITS.cel ? '°C' : '°F';
    } else {
      symbol = outputType === TEMP_UNITS.cel ? '°C' : '°F';
    }

    return `${output.toFixed(2)} ${symbol}`;
  }

}

