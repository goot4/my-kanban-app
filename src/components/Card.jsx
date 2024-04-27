
import {SortableItem} from './sortableItem'
export default function Card({cardData}) {
  return (
      <SortableItem id={cardData.id}>
        <div className={"border-4 border-amber-300"}>
          {cardData.content}
        </div>
      </SortableItem>
  )
}