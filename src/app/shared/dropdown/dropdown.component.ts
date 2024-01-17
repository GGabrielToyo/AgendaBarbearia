import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { BarbeiroService } from 'src/app/core/services/barbeiro.service';
import { Barbeiro } from 'src/app/core/types/type';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() label: string = '';
  //control = new FormControl<Barbeiro | string>('');
  barbeiros: Barbeiro[] = [];
  barbeiroSelecionado!: Barbeiro
  filteredOptions$?: Observable<Barbeiro[]>;
  @Input() control!: FormControl<Barbeiro | null>;
  @Output() emitirBarbeiro = new EventEmitter<Barbeiro>();

  constructor(
    private barbeiroService: BarbeiroService
  ) { }

  ngOnInit(): void {
    this.barbeiroService.getBarbeiros().subscribe(resp => {
      this.barbeiros = resp.content;
    });

    /*this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value =>{
        const nome = typeof value === 'string' ? value : value?.nome;
        return nome ? this._filter(nome as string) : this.barbeiros.slice();
      })
    )*/

  }

  emitBarbeiro(){
    this.emitirBarbeiro.emit(this.barbeiroSelecionado);
  }

  /*
  private _filter(value: string): Barbeiro[] {
    const filterValue = value.toLowerCase();

    return this.barbeiros.filter(barbeiro => barbeiro.nome.toLowerCase().includes(filterValue));
  }

  displayFn(barbeiro: Barbeiro): string {
    return barbeiro && barbeiro.nome ? barbeiro.nome : '';
  }
  */

}
