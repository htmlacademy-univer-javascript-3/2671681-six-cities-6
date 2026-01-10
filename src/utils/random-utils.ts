export function pickRandom<T>(items: T[]): T | null {
  return items.length > 0
    ? items[Math.floor(Math.random() * items.length)]
    : null;
}
