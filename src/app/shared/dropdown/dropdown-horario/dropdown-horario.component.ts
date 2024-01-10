import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown-horario',
  templateUrl: './dropdown-horario.component.html',
  styleUrls: ['./dropdown-horario.component.scss']
})
export class DropdownHorarioComponent{
  
  @Input() label: string = '';
  @Input() horariosDisponiveis: string[] = [];
  @Input() control!: FormControl;
  
  filteredOptions$: string[] = this.horariosDisponiveis;

  
}
