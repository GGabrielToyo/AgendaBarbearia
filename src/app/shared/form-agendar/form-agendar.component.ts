import { Component } from '@angular/core';

@Component({
  selector: 'app-form-agendar',
  templateUrl: './form-agendar.component.html',
  styleUrls: ['./form-agendar.component.scss']
})
export class FormAgendarComponent {
  dataSelecionada!: Date | null;

}
