import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events!: any;
  constructor(private ev: EventsService) {}

  ngOnInit(): void {
    this.ev.getEvents().subscribe(
      (res) => ((this.events = res), console.log(this.events)),
      (err) => console.log(err),
      () => console.log('Completed getting events')
    );
  }
}
