export class ScrollerManager {
  constructor(private element: HTMLElement) {}

  public get scrollWidth(): number {
    return this.element.scrollWidth;
  }

  public get scrollHeight(): number {
    return this.element.scrollHeight;
  }

  public get scrollLeft(): number {
    return this.element.scrollLeft;
  }

  public get scrollTop(): number {
    return this.element.scrollTop;
  }

  public get clientWidth(): number {
    return this.element.clientWidth;
  }

  public get clientHeight(): number {
    return this.element.clientHeight;
  }

  public get isScrollTopMin(): boolean {
    return this.scrollTop === 0;
  }

  public get isScrollTopMax(): boolean {
    return this.scrollTop + this.clientHeight >= this.scrollHeight;
  }

  public get isScrollLeftMin(): boolean {
    return this.scrollLeft === 0;
  }

  public get isScrollLeftMax(): boolean {
    return this.scrollLeft + this.clientWidth >= this.scrollWidth;
  }
}
