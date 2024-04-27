import './App.css';
import {DndContext, closestCenter} from "@dnd-kit/core";
import {useState} from "react";

import { listData, CardData } from './lib/data'
import List from "./components/list";
import {arrayMove} from "@dnd-kit/sortable";

function App() {
  console.log(listData.cards);
  const [cards, setCards] = useState(listData.cards);
  const [cards1, setCards1] = useState([new CardData(crypto.randomUUID(),"add new card")]);

  const addCardClickHandler = ()=>{
    console.log("add card")
    setCards(pre=> {
      pre[0].content = "this card is changed";
      return [...pre, new CardData(crypto.randomUUID(),"add new card")];
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if(active.id !== over.id){
      setCards((card)=>{
        const oldIndex = cards.findIndex(card=> card.id===active.id);
        const newIndex = cards.findIndex(card=> card.id===over.id);
        return arrayMove(cards, oldIndex, newIndex);
      });
    }
  }
  function handleDragOver(event) {

  }
  return (
    <div className="App">
      <div className="w-full h-[80vh] bg-gray-600 flex flex-row">
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}
          onDragOver={handleDragOver}>
          <div className={"w-[35vw] h-2/3 border-2 border-gray-200"}>
            <button onClick={addCardClickHandler}>Add card</button>
            <List cards={cards}/>
          </div>
          <div className={"w-[35vw] h-2/3 border-2 border-gray-200"}>
            <List cards={cards1}/>
          </div>
        </DndContext>
      </div>
    </div>
  )
    ;
}

export default App;
