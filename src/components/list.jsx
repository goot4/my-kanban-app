
import {useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

import Card from "./card";
export default function List({list}){
  const {setNodeRef}=useDroppable({id:list.id});
  return (
    <SortableContext id={list.id} items={list.cards} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className="w-1/3 min-h-32 bg-primary flex flex-col">
        <p className="text-base-100 ml-2 my-2">{list.title}</p>
        {list.cards.map((card) => (
          <Card key={card.id} cardData={card}></Card>
        ))}
      </div>
    </SortableContext>
  )
}