import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Persona, SharingService } from '../sharing.service';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css'],
})
export class DummyComponent {
  // protected data$: Observable<Persona>;
  protected person$: Observable<string | Persona>;

  constructor(private sharingService: SharingService) {
    this.person$ = sharingService.sharingObservable.pipe(
      // map(p => p.name)
    );
  }
}
