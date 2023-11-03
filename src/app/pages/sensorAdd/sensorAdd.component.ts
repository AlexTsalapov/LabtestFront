import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SensorService} from '../../services/sensor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Sensor} from "../../models/sensor.model";

@Component({
  selector: 'app-sensors-add',
  templateUrl: './sensorAdd.component.html',
  styleUrls: ['./sensorAdd.component.css']

})
export class SensorsAddComponent implements OnInit {
  sensorForm: FormGroup;
  sensorId: number = -1;
  fieldStates: { [key: string]: string } = {};
  unit = ['']
  type = ['']

  SensorData = {
    name: '',
    model: '',
    rangeFrom: 0,
    rangeTo: 0,
    type: '',
    unit: '',
    location: '',
    description: ''
  };

  constructor(private formBuilder: FormBuilder, private sensorService: SensorService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.sensorId = params['id'];
    });
    this.sensorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      model: ['', [Validators.required, Validators.maxLength(15)]],
      rangeFrom: [0, [Validators.required]],
      rangeTo: [0, [Validators.required]],
      type: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      location: ['', [Validators.maxLength(40)]],
      description: ['', [Validators.maxLength(200)]]},
      { validators: this.customValidator });
    if (this.sensorId !== -1) {
      this.sensorService.getSensor(this.sensorId).subscribe((sensor: Sensor) => {
        this.sensorForm.patchValue({
          name: sensor.name,
          model: sensor.model,
          rangeFrom: sensor.rangeFrom,
          rangeTo: sensor.rangeTo,
          type: sensor.type,
          unit: sensor.unit,
          location: sensor.location,
          description: sensor.description
        });
      });
    }

  }
    customValidator(group: FormGroup) {
    const name = group.get('name')?.value;
    const model = group.get('model')?.value;
    const type = group.get('type')?.value;
    const unit = group.get('unit')?.value;
    const rangeFrom = group.get('rangeFrom');
    const rangeTo = group.get('rangeTo');

    type ValidationErrors = {
      name?: string;
      model?: string;
      type?: string;
      unit?: string;
      rangeFrom?: string;
      rangeTo?: string;
    };

    const errors: ValidationErrors = {};

    if (!name || name.trim() === '') {
      errors['name'] = 'Name is required';
    }

    if (!model || model.trim() === '') {
      errors['model'] = 'Model is required';
    }

    if (!type || type.trim() === '') {
      errors['type'] = 'Type is required';
    }

    if (!unit || unit.trim() === '') {
      errors['unit'] = 'Unit is required';
    }

    if (rangeFrom && rangeTo && rangeFrom.value >= rangeTo.value) {
      errors['rangeFrom'] = 'RangeFrom is required';
      errors['rangeTo'] = 'RangeTo is required';
      if (rangeFrom) {
        rangeFrom.setErrors({'invalid': true}); // Устанавливаем ошибку для rangeFrom
      }
      if (rangeTo) {
        rangeTo.setErrors({'invalid': true}); // Устанавливаем ошибку для rangeTo
      }
    } else {
      if (rangeFrom) {
        rangeFrom.setErrors(null); // Убираем ошибку для rangeFrom, если валиден
      }
      if (rangeTo) {
        rangeTo.setErrors(null); // Убираем ошибку для rangeTo, если валиден
      }
    }
    return Object.keys(errors).length > 0 ? errors : null;
  }


  private updateFieldValidationStates() {
    for (const controlName in this.sensorForm.controls) {
      if (this.sensorForm.controls[controlName].invalid) {
        this.fieldStates[controlName] = 'invalid';
      } else {
        this.fieldStates[controlName] = 'valid';
      }
    }
  }

  getFieldClass(fieldName: string): any {
    return this.fieldStates[fieldName];
  }

  ngOnInit() {
    this.sensorService.getTypes().subscribe(
      (data) => {
        this.type = data;
      },
      (error) => {
        console.error('Failed to retrieve types:', error);
      }
    );

    this.sensorService.getUnits().subscribe(
      (data) => {
        this.unit = data;
        this.unit[this.SensorData.unit.indexOf('Celsium')] = '°С';
      },
      (error) => {
        console.error('Failed to retrieve types:', error);
      }
    );
    if (this.sensorId !== -1) {
      this.sensorService.getSensor(this.sensorId).subscribe(
        (data) => {
          this.SensorData = data
        })
    }
  }


  cansel() {
    this.router.navigate(['/sensors']);
  }

  save() {
    if (this.sensorForm.valid) {
      if (this.sensorForm.value.unit === '°С') {
        this.sensorForm.value.unit = 'Celsium'
      }
      const newSensor = this.sensorForm.value;
      if (this.sensorId != -1) {
        newSensor.id = this.sensorId
      }
      newSensor.description = this.SensorData.description
      this.sensorService.createSensor(newSensor).subscribe(
        (response) => {
          console.log('Sensor added successfully');
          this.sensorForm.reset();
          this.router.navigate(['/sensors']);
        },
        (error) => {
          console.error('Failed to add sensor:', error);
        }
      );


    } else {
      this.updateFieldValidationStates();
      console.log(this.fieldStates);
    }
  }

  public onLocationChange(value: string) {
    this.sensorForm.patchValue({location: value});
  }

  public onModelChange(value: string) {
    this.sensorForm.patchValue({model: value});
  }

  public onNameChange(value: string) {
    this.sensorForm.patchValue({name: value});
  }

  public onToChange(value: number) {
    this.sensorForm.patchValue({rangeTo: value});
  }

  public onFromChange(value: number) {
    this.sensorForm.patchValue({rangeFrom: value});
  }

  public onTypeChange(value: string) {
    this.sensorForm.patchValue({type: value});
  }

  public onUnitChange(value: string) {
    this.sensorForm.patchValue({unit: value});
  }
}
