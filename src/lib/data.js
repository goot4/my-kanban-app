export class CardData {
  id;
  title;
  description;
  isDone;
  constructor(title, description, isDone=false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.isDone = isDone;
  }
}

const defaultCardData = {
  id: crypto.randomUUID(),
  title: '我可以被拖动👈',
  description: `点我还可以进行编辑\n\n任务: 把我拖到Done栏试试👀`,
  isDone: false,
}

export const initialListsData = [
  { id: 'todo', title: 'Todo', cards: [defaultCardData]},
  { id: 'doing', title: 'Doing', cards: []},
  { id: 'done', title: 'Done', cards: []}
]