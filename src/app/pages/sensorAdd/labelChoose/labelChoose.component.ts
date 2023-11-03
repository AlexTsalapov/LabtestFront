import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-label-choose',
  templateUrl: './labelChoose.component.html',
  styleUrls: ['./labelChoose.component.css']
})
export class LabelChooseComponent {
  @Input() from: number = 0;
  @Output() fromChange = new EventEmitter<number>();
  @Input() to: number = 0;
  @Output() toChange = new EventEmitter<number>();
  @Input() fieldStates: { [key: string]: string } = {};
  @Input() fromElement = '';
  @Input() toElement = '';
  @Input() initialTo = 0
  @Input() initialFrom = 0

  onFromChange(event: any) {
    const enteredValue = +event.target.value; // Преобразуйте строку в число
    this.fromChange.emit(enteredValue);
  }

  onToChange(event: any) {
    const enteredValue = +event.target.value; // Преобразуйте строку в число
    this.toChange.emit(enteredValue);
  }

  decrementTo() {
    if (this.to > this.from) this.to--;
    this.toChange.emit(this.to);
  }

  incrementTo() {
    this.to++;
    this.toChange.emit(this.to);
  }

  decrementFrom() {
    this.from--;
    this.fromChange.emit(this.from);
  }

  incrementFrom() {
    if (this.from < this.to) this.from++;
    this.fromChange.emit(this.from);
  }

  getFieldClass(fieldName: string): string {
    return this.fieldStates[fieldName] === 'invalid' ? 'invalid' : 'valid';
  }

  constructor() {
  }
}
