

const shortTitle = "normal title";
const longTitle = "start long long long long long title";
const reallyLongTitle = "start long long long long long long long long long long long title"
const emptyDescription = "";
const shortDescription = "description";
const longDescription = "long long long long long long long long long long long long description";

export const testCardData = {
  id: `test card 0`,
  title: shortTitle,
  description: longDescription,
  isDone: false,
}
const testCardData1= {
  id: `test card 1`,
  title: longTitle,
  description: longDescription,
  isDone: false,
}
const testCardData2= {
  id: `test card 2`,
  title: `test card 2`,
  description: longDescription,
  isDone: false,
}
const testCardData3= {
  id: `test card 3`,
  title: `test card 3`,
  description: longDescription,
  isDone: false,
}

export const listsData = [
  { id: 'todo', title: 'Todo', cards: [testCardData, testCardData1, testCardData2, testCardData3]},
  { id: 'doing', title: 'Doing', cards: []},
  { id: 'done', title: 'Done', cards: []}
]