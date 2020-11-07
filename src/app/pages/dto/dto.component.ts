import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Dto } from 'src/app/models/dto';
import { DtoService } from 'src/app/services/dto.service';

@Component({
  selector: 'app-dto',
  templateUrl: './dto.component.html',
  styleUrls: ['./dto.component.scss']
})
export class DtoComponent implements OnInit {
  formGroup: FormGroup;
  loading: { [key: string]: boolean} = {};
  subscriptions: { [key: string]: any} = {};

  constructor(
    private fb: FormBuilder,
    private service: DtoService
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(): void {
    this.formGroup = this.fb.group({
      creditCardNumber: ['', Validators.required],
      cardHolder: ['', Validators.required],
      expirationDate: ['', Validators.required],
      securityCode: ['', Validators.pattern('^[0-9]\{3}')],
      amount: ['', Validators.required ]
    }, { validator: this.customValidations });
  }

  customValidations(c: AbstractControl): { [key: string]: string } {
    const date = c.get('expirationDate').value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date && new Date(date) < today) {
      return {
        expirationDate: 'Expiration Date cannot be in the past'
      };
    }

    if (c.get('amount').value < 1) {
      return {
        amount: 'Amount be greater than zero (0)'
      };
    }

  }

  createDto(): void {
    if (!this.formGroup.valid) {
      alert('Please check the form, some input are invalid');
      return;
    }

    this.unsubscribe('create');

    this.loading.saving = true;
    this.subscriptions.create = this.service.create(this.formGroup.value).subscribe((dto: Dto) => {
      this.afterRequest('saving', 'create');
      this.formGroup.reset();
      alert('Successfully Saved');
    }, () => {
      alert('There was an error on saving');
      this.afterRequest('saving', 'create');
    });
  }

  afterRequest(loading: string, subs: string): void {
    this.loading[loading] = false;
    this.unsubscribe(subs);
  }

  unsubscribe(key: string): void {
    if (this.subscriptions[key]) {
      this.subscriptions[key].unsubscribe();
    }
  }
}
