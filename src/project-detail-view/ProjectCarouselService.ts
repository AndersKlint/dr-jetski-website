export type CarouselSlotName = 'selected' | 'left-1' | 'left-2' | 'right-1' | 'right-2';

export interface CarouselSlot {
  name: CarouselSlotName;
  index: number;
  offset: number;
  depth: 0 | 1 | 2;
}

const SLOT_DEFINITIONS: Array<Omit<CarouselSlot, 'index'>> = [
  { name: 'left-2', offset: -2, depth: 2 },
  { name: 'left-1', offset: -1, depth: 1 },
  { name: 'selected', offset: 0, depth: 0 },
  { name: 'right-1', offset: 1, depth: 1 },
  { name: 'right-2', offset: 2, depth: 2 },
];

export class ProjectCarouselService {
  private current = 0;

  constructor(private readonly itemCount: number) {}

  get currentIndex(): number {
    return this.current;
  }

  select(index: number): number {
    if (this.itemCount === 0) return this.current;
    this.current = Math.min(Math.max(index, 0), this.itemCount - 1);
    return this.current;
  }

  getVisibleSlots(maxPerSide: 1 | 2 = 2): CarouselSlot[] {
    if (this.itemCount === 0) return [];
    return SLOT_DEFINITIONS.filter((slot) => {
      const index = this.current + slot.offset;
      return Math.abs(slot.offset) <= maxPerSide && index >= 0 && index < this.itemCount;
    }).map((slot) => ({
      ...slot,
      index: this.current + slot.offset,
    }));
  }
}
