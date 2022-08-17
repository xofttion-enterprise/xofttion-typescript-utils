import { Queque } from '../src/queque';

describe('Queque', () => {
  it('should correctly enqueue and dequeue the queue stream', () => {
    const queque = new Queque<string>();

    queque.enqueue('Daniel Castillo');
    expect(queque.length).toBe(1);

    queque.enqueue('Adrian Castillo');
    queque.enqueue('Fabian Castillo');
    expect(queque.length).toBe(3);

    const daniel = queque.dequeue();

    expect(daniel.isPresent()).toBe(true);
    expect(daniel.get()).toBe('Daniel Castillo');
    expect(queque.length).toBe(2);

    const adrian = queque.dequeue();

    expect(adrian.isPresent()).toBe(true);
    expect(adrian.get()).toBe('Adrian Castillo');
    expect(queque.length).toBe(1);

    queque.enqueue('Katherin Narvaez');
    expect(queque.length).toBe(2);

    const fabian = queque.dequeue();

    expect(fabian.isPresent()).toBe(true);
    expect(fabian.get()).toBe('Fabian Castillo');
    expect(queque.length).toBe(1);

    const kathe = queque.dequeue();

    expect(kathe.isPresent()).toBe(true);
    expect(kathe.get()).toBe('Katherin Narvaez');
    expect(queque.length).toBe(0);

    const nothing = queque.dequeue();
    expect(nothing.isEmpty()).toBe(true);
    expect(queque.length).toBe(0);
  });
});
