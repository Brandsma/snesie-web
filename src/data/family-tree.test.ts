import { describe, expect, it } from 'vitest';
import { lineage } from './family-tree';

describe('family tree lineage', () => {
  it('walks from a great-grandparent down to Jij', () => {
    expect([...lineage('og2')]).toEqual(['og2', 'g1', 'p1', 'me']);
    expect([...lineage('og7')]).toEqual(['og7', 'g4', 'p2', 'me']);
  });

  it('handles Jij and unknown ids', () => {
    expect([...lineage('me')]).toEqual(['me']);
    expect(lineage('nope').size).toBe(0);
  });
});
