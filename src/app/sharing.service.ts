import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Persona {
  name: string;
  age?: number;
}

@Injectable()
export class SharingService {
  // private sharingObservablePrivate = new BehaviorSubject<Persona>({
  //   name: 'Martin Emanuel',
  // });
  private arrayOfPeople: Persona[] = [
    {
      name: 'martin emanuel',
      age: 29,
    },
  ];
  private sharingObservablePrivate$: BehaviorSubject<Persona> =
    new BehaviorSubject<Persona>({
      name: 'yicon',
      age: 5,
    });
  private sharingDependentObservablePrivate$: BehaviorSubject<Persona> =
    new BehaviorSubject<Persona>({
      name: 'yicon',
      age: 5,
    });

  get sharingObservable() {
    return this.sharingObservablePrivate$.asObservable();
  }
  get sharingObservableDependant() {
    return this.sharingDependentObservablePrivate$.asObservable();
  }
  set sharingObservableData(data: Persona) {
    this.sharingObservablePrivate$.next(data);
  }
  set sharingDependantObservableData(nameWanted: string) {
    const foundedPerson = this.arrayOfPeople.find((p) => p.name === nameWanted);
    if (!foundedPerson) {
      throw new Error('Person not founded');
    }
    this.sharingDependentObservablePrivate$.next(foundedPerson);
  }
  /** first example */
  // get sharingObservable() {
  //   return this.sharingObservablePrivate.asObservable();
  // }
  // set sharingObservableData(user: Persona) {
  //   this.sharingObservablePrivate.next(user);
  // }
}
