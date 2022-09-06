import { Store } from '../src/store';

interface Person {
  age: number;
  firstName: string;
  lastName: string;
}

class PersonStore extends Store<Person> {
  public setFistName(firstName: string): void {
    this.reduce((person) => ({ ...person, firstName }));
  }
}

describe('Store', () => {
  const store = new PersonStore({
    age: 30,
    firstName: 'Daniel',
    lastName: 'Castillo'
  });

  it('Created successful', () => {
    expect(store).toBeTruthy();
  });

  it('Initial values', () => {
    const firstState = store.current();

    expect(firstState.firstName).toBe('Daniel');
    expect(firstState.lastName).toBe('Castillo');
    expect(firstState.age).toBe(30);
  });

  it('Change fistName', () => {
    const firstState = store.current();

    store.setFistName('Adrian');

    const secondState = store.current();

    expect(firstState.firstName).toBe('Daniel');
    expect(secondState.firstName).toBe('Adrian');
  });
});
