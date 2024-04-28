
import {useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Card from "./Card";
export default function List({list}){
  const {setNodeRef}=useDroppable({id:list.id});
  return (
    <SortableContext id={list.id} items={list.cards} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className={"border-amber-50 border-2 m-2 p-2"}>
        {list.cards.map((card)=> (
          <Card cardData={card}></Card>
        ))}
      </div>
    </SortableContext>
  )
}