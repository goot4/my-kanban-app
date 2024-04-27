import {useDroppable} from "@dnd-kit/core";

export default function Droppable({id, children}){
  const {isOver, setNodeRef} = useDroppable({id: id});
  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
}