
import { useState} from "react";
import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import {SortableItem} from "./sortableItem";

export default function Card({cardData}) {
  const [pointerIn, setPointerIn] = useState(false);
  const pointerEnterHandler = () => {
    // console.log("pointerEnter");
    setPointerIn(true);
  }
  const pointerLeaveHandler = () => {
    // console.log("pointerLeave");
    setPointerIn(false);
  }
  return (
    <SortableItem id={cardData.id}>
      <div className="h-14 border-base-100 bg-primary border-x border-y mx-2 flex flex-row items-stretch cursor-pointer transition-all hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-4px_4px_0px] hover:shadow-base-100"
           onPointerEnter={pointerEnterHandler} onPointerLeave={pointerLeaveHandler}>
        <div className="flex flex-row items-center">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10h1M15 14h1M15 6h1M9 10h1M9 14h1M15 18h1M9 18h1M9 6h1" stroke="#000000" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={clsx("flex flex-row items-center mr-2", { "hidden": cardData.isDone===false})}>
          <CheckCircleIcon className="size-6 text-secondary bg-base-100 rounded-xl"/>
        </div>
        <div className="grow flex flex-col overflow-hidden">
          <p className="my-auto text-base-100 text-lg font-bold leading-snug">{cardData.title}</p>
          <p className={clsx("text-base-100 text-sm truncate",{ "hidden": cardData.description===''})}>{cardData.description}</p>
        </div>
        <div className={clsx("flex flex-row items-center ml-2",{"invisible": pointerIn===false})}>
          <PencilSquareIcon className="size-6 text-base-100"/>
        </div>
      </div>
    </SortableItem>
  )
}