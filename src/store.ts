import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class State<T> {
  private _subject: BehaviorSubject<T>;

  constructor(private _initialValue: T) {
    this._subject = new BehaviorSubject(this._initialValue);
  }

  public reducer(callReducer: (_: T) => T): void {
    this._subject.next(callReducer(this._subject.value));
  }

  public select<V>(callSelect: (_: T) => V): V {
    return callSelect({ ...this._subject.value });
  }

  public observable(): Observable<T> {
    return this._subject.asObservable();
  }

  public reset(): void {
    this.reducer(() => this._initialValue);
  }
}

export class Store<T> {
  private _state: State<T>;

  constructor(value: T) {
    this._state = new State(value);
  }

  public reducer(callReducer: (_: T) => T): void {
    this._state.reducer(callReducer);
  }

  public select<V>(callSelect: (_: T) => V): V {
    return this._state.select(callSelect);
  }

  public observer<V>(callObserver: (_: T) => V): Observable<V> {
    return this._state.observable().pipe(map((state) => callObserver(state)));
  }

  public reset(): void {
    this._state.reset();
  }
}
