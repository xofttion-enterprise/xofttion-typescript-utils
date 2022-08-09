import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class State<T> {
  private subject: BehaviorSubject<T>;

  constructor(private _initialValue: T) {
    this.subject = new BehaviorSubject(this._initialValue);
  }

  public reducer(callReducer: (_: T) => T): void {
    this.subject.next(callReducer(this.subject.value));
  }

  public select<V>(callSelect: (_: T) => V): V {
    return callSelect({ ...this.subject.value });
  }

  public observable(): Observable<T> {
    return this.subject.asObservable();
  }

  public reset(): void {
    this.reducer(() => this._initialValue);
  }
}

export class Store<T> {
  private state: State<T>;

  constructor(value: T) {
    this.state = new State(value);
  }

  public reducer(callReducer: (_: T) => T): void {
    this.state.reducer(callReducer);
  }

  public select<V>(callSelect: (_: T) => V): V {
    return this.state.select(callSelect);
  }

  public observer<V>(callObserver: (_: T) => V): Observable<V> {
    return this.state.observable().pipe(map((state) => callObserver(state)));
  }

  public reset(): void {
    this.state.reset();
  }
}
