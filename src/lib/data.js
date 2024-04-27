export class CardData {
  id;
  content;
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }
}

export const listData = {
  id: crypto.randomUUID(),
  cards: Array(4).fill(0).map(()=> new CardData(crypto.randomUUID(), `this is a card ${Math.random()}`)),
}