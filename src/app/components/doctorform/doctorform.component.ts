import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-doctorform',
  templateUrl: './doctorform.component.html',
  styleUrls: ['./doctorform.component.css']
})
export class DoctorformComponent {

   
  // List of symptoms
  symptomsList: string[] = [
    'Fever', 'Chills', 'Fatigue', 'Weakness', 'Sweating', 'Unintended weight loss', 'Cough', 'Shortness of breath',
    'Chest pain', 'Palpitations', 'Dizziness', 'Fainting or syncope', 'Headache', 'Vision changes', 'Nausea',
    'Vomiting', 'Abdominal pain', 'Diarrhea', 'Constipation', 'Changes in bowel habits', 'Blood in stool',
    'Blood in urine', 'Frequent urination', 'Painful urination', 'Back pain', 'Joint pain', 'Muscle pain or stiffness',
    'Swelling or edema', 'Skin changes or rash', 'Bruising or bleeding', 'Difficulty swallowing', 'Sore throat',
    'Earache', 'Hearing loss', 'Changes in taste or smell', 'Numbness or tingling', 'Memory loss or confusion',
    'Mood changes or depression', 'Sleep disturbances', 'Changes in appetite', 'Excessive thirst', 'Excessive hunger',
    'Excessive urination', 'Menstrual changes', 'Erectile dysfunction', 'Pain or discomfort during intercourse',
    'Respiratory symptoms (wheezing, coughing, shortness of breath)', 'Skin discoloration', 'Lesions or lumps',
    'Difficulty in concentrating or focusing'
  ];

  // Control for symptoms autocomplete
  symptomsControl = new FormControl();
  filteredSymptoms: Observable<string[]>;

  patient = {
    age: null,
    symptoms: '',
    gender: 'male',
    tests: ''
  };

  showResults = false;
  diseases: string[] = [];
  treatments: string[] = [];

  constructor() {
    // Set up observable to filter symptoms based on user input
    this.filteredSymptoms = this.symptomsControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterSymptoms(value))
    );
  }

  filterSymptoms(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.symptomsList.filter(symptom => symptom.toLowerCase().includes(filterValue));
  }

  submitForm() {
    // Perform logic to determine diseases and treatments based on input data
    this.diseases = this.determineDiseases();
    this.treatments = this.determineTreatments();

    // Display the results
    this.showResults = true;
  }

  determineDiseases() {
    // Implement logic to determine diseases based on input data
    // For simplicity, using hardcoded values
    const symptomsList = this.patient.symptoms.split(',').map(symptom => symptom.trim());

    // Example: Check for specific symptoms and suggest diseases
    if (symptomsList.includes('Fever') && symptomsList.includes('Cough')) {
      return ['Influenza', 'Common Cold'];
    } else if (symptomsList.includes('Shortness of breath')) {
      return ['Asthma', 'Pneumonia'];
    } else {
      return ['Unknown'];
    }
  }

  determineTreatments() {
    // Implement logic to determine treatments based on input data
    // For simplicity, using hardcoded values
    const symptomsList = this.patient.symptoms.split(',').map(symptom => symptom.trim());

    // Example: Check for specific symptoms and suggest treatments
    if (symptomsList.includes('Fever') && symptomsList.includes('Cough')) {
      return ['Rest', 'Hydration', 'Antiviral Medication'];
    } else if (symptomsList.includes('Shortness of breath')) {
      return ['Bronchodilators', 'Antibiotics', 'Rest'];
    } else {
      return ['contact to senior doctort'];
    }
  }
}
