import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onInputChanged(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.search.emit(query);
  }
}
