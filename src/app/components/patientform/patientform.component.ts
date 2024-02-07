import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-patientform',
  templateUrl: './patientform.component.html',
  styleUrls: ['./patientform.component.css']
})
export class PatientformComponent implements OnInit {
  showSugarLevels: boolean = false;

  symptomsData: any[] = [];
  allergiesData: any[] = [];
  patientForm: FormGroup;
  filteredSymptoms: string[] = [];

  constructor(private fb: FormBuilder, private myservice: MyserviceService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.patientForm = this.fb.group({
      age: ['', Validators.required],
      gender: ['', Validators.required],
      bloodPressure: this.fb.group({
        systolic: ['', Validators.required],
        diastolic: ['', Validators.required],
      }),
      bloodGroup: ['', Validators.required],
      allergies: [''],
      additionalInfo: [''],
      systolicPressure: ['', Validators.required],
      diastolicPressure: ['', Validators.required],
      temperature: ['', Validators.required],
      diabetic: ['no', Validators.required],
      sugarLevel: this.fb.group({
        fasting: ['', Validators.required],
        postPrandial: ['', Validators.required]
      }),
      bodyTemperature: [null, Validators.required]
    });

    this.myservice.getSymptoms().subscribe(data => {
      this.symptomsData = data;
      console.log(this.symptomsData);
    });
    this.myservice.getAllergies().subscribe(data => {
      this.allergiesData = data;
      console.log(this.allergiesData);
    });

    this.patientForm.get('additionalInfo').valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(value => this._filterSymptoms(value))
      )
      .subscribe(filteredSymptoms => {
        this.filteredSymptoms = filteredSymptoms;
        console.log(filteredSymptoms);
      });

    // Subscribe to changes in the diabetic status to control visibility of sugar levels

    this.patientForm.get('diabetic').valueChanges.subscribe(value => {
      this.toggleSugarLevels(value === 'yes');
      if (value === 'yes') {
        // If diabetic is 'yes', enable and set validators for sugar level fields
        this.patientForm.get('sugarLevel.fasting').enable();
        this.patientForm.get('sugarLevel.postPrandial').enable();
      } else {
        // If diabetic is 'no', disable and clear validators for sugar level fields
        this.patientForm.get('sugarLevel.fasting').disable();
        this.patientForm.get('sugarLevel.postPrandial').disable();
        this.patientForm.get('sugarLevel.fasting').clearValidators();
        this.patientForm.get('sugarLevel.postPrandial').clearValidators();
      }
      // Update validation status
      this.patientForm.get('sugarLevel.fasting').updateValueAndValidity();
      this.patientForm.get('sugarLevel.postPrandial').updateValueAndValidity();
    });
  }


  submitForm() {
    if (this.patientForm.valid) {
      console.log('Patient Information:', this.patientForm.value);
      this.snackBar.open('Form submitted successfully!', 'Close', {
        duration: 3000, // Duration in milliseconds
      });
    } else {
      // Handle invalid form
      this.snackBar.open('Please fill out all required fields!', 'Close', {
        duration: 3000,
      });
    }

  }


  toggleSugarLevels(isDiabetic: boolean = false): void {
    this.showSugarLevels = isDiabetic;
    const sugarLevelGroup = this.patientForm.get('sugarLevel');
    if (isDiabetic) {
      // Enable and set validators for sugar level fields
      sugarLevelGroup.enable();
      sugarLevelGroup.get('fasting').setValidators(Validators.required);
      sugarLevelGroup.get('postPrandial').setValidators(Validators.required);
    } else {
      // Reset and disable sugar level fields
      sugarLevelGroup.disable();
    }
    // Update validation status after changing validators
    sugarLevelGroup.get('fasting').updateValueAndValidity();
    sugarLevelGroup.get('postPrandial').updateValueAndValidity();
  }

  symptomSelected(event: MatAutocompleteSelectedEvent): void {
    if (event && event.option && event.option.viewValue) {
      const selectedSymptom = event.option.viewValue;
      const additionalInfoControl = this.patientForm.get('additionalInfo');

      if (additionalInfoControl) {
        const currentSymptoms = additionalInfoControl.value || [];
        additionalInfoControl.setValue([...currentSymptoms, selectedSymptom]);
      }
    }
  }

  private _filterSymptoms(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.symptomsData
      .filter(symptom => symptom.name.toLowerCase().includes(filterValue))
      .map(symptom => symptom.name);
  }
}
