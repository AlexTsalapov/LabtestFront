import { Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent {
  @Input()  name='';
  @Input()fieldStates: { [key: string]: string } = {};
  @Input() nameElement=''
  @Output() valueChange = new EventEmitter<string>();
  @Input() holder=''
  @Input() initialValue=''


  constructor() {}
  onInputChange(event: any) {

    const enteredValue = event.target.value;
    this.valueChange.emit(enteredValue);



  }
  getFieldClass(fieldName: string): string {
    return this.fieldStates[fieldName] === 'invalid' ? 'invalid' : 'valid';
  }
}
