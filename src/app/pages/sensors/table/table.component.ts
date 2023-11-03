import { Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-label',
  templateUrl: './table.component.html',
  styleUrls: ['./tabel.component.css']
})
export class TableComponent {
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
