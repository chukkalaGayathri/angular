import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-testautomatch',
  templateUrl: './testautomatch.component.html',
  styleUrls: ['./testautomatch.component.css']
})
export class TestautomatchComponent implements OnInit {

  symptomsData: any[] = [];
  patientForm: FormGroup;
  filteredSymptoms: string[] = [];

  constructor(private myservice: MyserviceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.myservice.getSymptoms().subscribe(data => {
      this.symptomsData = data;
      console.log(this.symptomsData); // Check if data is received
    });

    this.patientForm = this.fb.group({
      additionalInfo: ['']
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
  }

  private _filterSymptoms(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.symptomsData
      .filter(symptom => symptom.name.toLowerCase().includes(filterValue))
      .map(symptom => symptom.name);
  }

  submitForm(): void {
    // Handle form submission logic here
    console.log('Form submitted:', this.patientForm.value);
  }
}