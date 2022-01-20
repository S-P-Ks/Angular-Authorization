import { Component, OnInit } from '@angular/core';
import { SpecialService } from './special.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css'],
})
export class SpecialEventsComponent implements OnInit {
  special: any;
  constructor(private specialService: SpecialService) {}

  ngOnInit(): void {
    this.specialService.getSpecial().subscribe(
      (res) => ((this.special = res), console.log(res)),
      (err) => console.log(err),
      () => console.log('Completed getting Special Events')
    );
  }
}
