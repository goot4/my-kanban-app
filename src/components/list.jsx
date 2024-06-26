
import {useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

import {SortableItem} from "./sortableItem";
import Card from "./card";
export default function List({list, addCardHandler}){
  const {setNodeRef}=useDroppable({id:list.id});
  return (
    <SortableContext id={list.id} items={list.cards} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className="w-[32%] p-2 min-h-64 bg-primary flex flex-col space-y-2">
        <p className="text-base-100 ml-2 my-2">{list.title}</p>
        {list.cards.map((card) => (
          <SortableItem key={card.id} id={card.id}><Card cardData={card}></Card></SortableItem>
        ))}
        <button onClick={clickHandler} className={"w-fit m-auto text-base-100"}>+ 添加卡片</button>
      </div>
    </SortableContext>
  )

  function clickHandler(){
    console.log(list);
    addCardHandler(list);
  }
}