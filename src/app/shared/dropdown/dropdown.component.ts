import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit{

  @Input() label: string = '';

  filteredOptions$ = ['Barbeiro 1', 'Barbeiro 2'];

  constructor(){}

  ngOnInit(): void {
 
  }

 
}
