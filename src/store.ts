import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

class State<T> {
  private subject: BehaviorSubject<T>;

  constructor(private _initialValue: T) {
    this.subject = new BehaviorSubject(Object.freeze(this._initialValue));
  }

  public current(): T {
    return this.subject.value;
  }

  public reduce(reducer: (_: T) => T): void {
    this.subject.next(Object.freeze(reducer(this.subject.value)));
  }

  public select<V>(selector: (_: T) => V): V {
    return selector(this.subject.value);
  }

  public observe(): Observable<T> {
    return this.subject.asObservable();
  }

  public subscribe(subscriber: (_: T) => void): Subscription {
    return this.observe().subscribe(subscriber);
  }

  public reset(): void {
    this.reduce(() => this._initialValue);
  }
}

export class Store<T> {
  private state: State<T>;

  constructor(value: T) {
    this.state = new State(value);
  }

  public current(): T {
    return this.state.current();
  }

  protected reduce(reducer: (_: T) => T): void {
    this.state.reduce(reducer);
  }

  protected select<V>(selector: (_: T) => V): V {
    return this.state.select(selector);
  }

  protected observe<V>(observer: (_: T) => V): Observable<V> {
    return this.state.observe().pipe(map((state) => observer(state)));
  }

  public reset(): void {
    this.state.reset();
  }
}
