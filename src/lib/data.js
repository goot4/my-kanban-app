export class CardData {
  id;
  content;
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }
}

export const listsData = [{
  id: `list-0`,
  cards: Array(4).fill(0)
    .map((value, index)=> new CardData(`${index}`, `this is a card ${index}`)),
  },
  {
    id: `list-1`,
    cards: Array(4).fill(0)
      .map((value, index)=> new CardData(`${index+10}`, `this is a card ${index+10}`)),
  },
  {
    id: `list-2`,
    cards: Array(0).fill(0)
      .map((value, index)=> new CardData(`${index+10}`, `this is a card ${index+10}`)),
  }
]