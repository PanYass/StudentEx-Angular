import { Component, computed, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-counter-component',
  styleUrl: './counter-component.css',
  templateUrl: './counter-component.html',
})
export class CounterComponent {

  count = signal<number>(0)
  increment(): void{
    this.count.update(c=>c+1)

  }

  reset():void {
    this.count.set(0)

  }

  doubleCounter = computed( () => this.count()*2)

}
