import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialService } from './special.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css'],
})
export class SpecialEventsComponent implements OnInit {
  special: any;
  constructor(private specialService: SpecialService, private router: Router) {}

  ngOnInit(): void {
    this.specialService.getSpecial().subscribe(
      (res) => ((this.special = res), console.log(res)),
      (err) => this.router.navigate(['/login']),
      () => console.log('Completed getting Special Events')
    );
  }
}
