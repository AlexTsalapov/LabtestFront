import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-label-db-choose',
  templateUrl: './labelDbChoose.component.html',
  styleUrls: ['./labelDbChoose.component.css']
})
export class LabelDbChooseComponent {
  selectedValue= 'Selected';
  @Input()fieldStates: { [key: string]: string } = {};
  @Input() nameElement=''
  @Output() selectedChange= new EventEmitter<string>();
  @Input() name:String=""
  @Input() values: string[] = [];
  @Input() initialValue=""

  upClick() {
    const currentIndex = this.values.indexOf(this.selectedValue);
    if (currentIndex === -1) {
      // Если элемент не найден, выбираем первый элемент
      this.selectedValue = this.values[0];
    } else if (currentIndex === this.values.length - 1) {
      // Если выбран последний элемент, переключаемся на первый
      this.selectedValue = this.values[0];
    } else {
      // Иначе переключаемся на следующий элемент
      this.selectedValue = this.values[currentIndex + 1];
    }
    this.selectedChange.emit(this.selectedValue);
  }
  downClick() {
    const currentIndex = this.values.indexOf(this.selectedValue);
    if (currentIndex === -1) {
      this.selectedValue = this.values[this.values.length-1];
    } else if (currentIndex === 0) {
      // Если выбран последний элемент, переключаемся на первый
      this.selectedValue = this.values[this.values.length-1];
    } else {
      // Иначе переключаемся на следующий элемент
      this.selectedValue = this.values[currentIndex - 1];
    }
    this.selectedChange.emit(this.selectedValue);
  }
  onChange(event: any) {
    const enteredValue = event.target.value;
    this.selectedChange.emit(enteredValue);
  }
  getFieldClass(fieldName: string): string {
    return this.fieldStates[fieldName] === 'invalid' ? 'invalid' : 'valid';
  }
  constructor() {


  }
}
