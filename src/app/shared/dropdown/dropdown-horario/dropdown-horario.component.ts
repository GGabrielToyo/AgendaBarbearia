import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-horario',
  templateUrl: './dropdown-horario.component.html',
  styleUrls: ['./dropdown-horario.component.scss']
})
export class DropdownHorarioComponent{
  
  @Input() label: string = '';
  @Input() horariosDisponiveis: string[] = [];
  
  filteredOptions$: string[] = this.horariosDisponiveis;

  
}
