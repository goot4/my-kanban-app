import './App.css';
import {DndContext, closestCorners} from "@dnd-kit/core";
import {useState} from "react";

import { listsData, } from './lib/data'
import List from "./components/list";
import {arrayMove} from "@dnd-kit/sortable";

function App() {
  const [lists, setLists] = useState(listsData);
  const [activeId, setActiveId] = useState();

  // find the list which the id belongs to, return the list.
  function findContainer(id){
    let res = lists.find(list=>( list.id === id ||
      list.cards.find(card=>card.id === id) !== undefined
    ));
    return res;
  }
  function handleDragStart(event){
    const id = event.active.id;
    console.log(id);
    setActiveId(id);
  }
  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    console.log({ id, overId, activeContainer, overContainer });

    // Container not in lists or moving in the same container
    if(!activeContainer||!overContainer|| activeContainer===overContainer) return;

    setLists(pre => {
      const activeCards = activeContainer.cards;
      const overCards = overContainer.cards;
      const activeIndex = activeCards.findIndex(card => card.id === id);
      const overIndex = overCards.findIndex(card => card.id === id); // overIndex may not exist.
      let newIndex;
      if(pre.find(list=> list.id === overId)){
        // We're at the root droppable of a container
        newIndex = overCards.length+1;
      }else{
        const isBelowLastItem = over && overIndex === overCards.length-1 &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;
        const modifier = isBelowLastItem? 1:0;
        newIndex = overIndex>=0? overIndex+modifier : overCards.length+1;
      }
      overContainer.cards = [...overCards.slice(0,newIndex), activeCards[activeIndex], ...overCards.slice(newIndex, overCards.length)]
      activeContainer.cards = [...activeCards.filter(card => card.id !== activeId)];
      return pre;
    });
  }
  function handleDragEnd(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    // Container not in lists or moving in the DIFFERENT container
    if(!activeContainer||!overContainer|| activeContainer!==overContainer) return;
    if(active.id !== over.id){
      setLists((lists)=>{
        const cards = overContainer.cards;
        const oldIndex = cards.findIndex(card=> card.id===active.id);
        const newIndex = cards.findIndex(card=> card.id===over.id);
        overContainer.cards = arrayMove(cards, oldIndex, newIndex);
        return lists;
      });
    }
    setActiveId(null);
  }


  return (
    <div className="App">
      <div className="w-full h-[80vh] bg-gray-600 flex flex-row">
        <DndContext collisionDetection={closestCorners}
                    onDragStart={handleDragStart} onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}>
          <div className={"w-[35vw] h-2/3 border-2 border-gray-200"}>
            <List list={lists[0]}/>
          </div>
          <div className={"w-[35vw] h-2/3 border-2 border-gray-200"}>
            <List list={lists[1]}/>
          </div>
          <div className={"w-[35vw] h-2/3 border-2 border-gray-200"}>
            <List list={lists[2]}/>
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
