
import {rectSortingStrategy, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Card from "./Card";
export default function List({cards}){
  return (
    <SortableContext items={cards} strategy={verticalListSortingStrategy}>
      <div className={"border-amber-50 border-2 m-2 p-2"}>
        {cards.map((card)=> (
          <div key={card.id} className={"border-2 border-sky-400 m-2 p-2"}>
            <Card cardData={card}></Card>
          </div>
        ))}
      </div>
    </SortableContext>
  )
}