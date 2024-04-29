import {XMarkIcon} from "@heroicons/react/24/outline";
import {useEffect, useRef, useState} from "react";
import clsx from "clsx";

export default function EditorOvercast({isOpen, oldTitle, oldDescription, callback}) {
  const [title,setTitle] = useState(oldTitle);
  const [description, setDescription] = useState(oldDescription);
  const bgEleRef = useRef(null);
  function applyClickHandler(event){
    event.stopPropagation();
    console.log("Apply");
    callback(true,title,description);
  }
  function cancelClickHandler(event){
    event.stopPropagation();
    if(event.target !== bgEleRef.current) return;
    console.log("Cancel");
    callback(false);
  }
  function xClickHandler(evt){
    evt.stopPropagation();
    console.log("Cancel");
    callback(false);
  }
  function titleChangeHandler(evt){
      setTitle(evt.target.value);
  }
  function descriptionChangeHandler(evt){
      setDescription(evt.target.value);
  }

  useEffect(() => {
    setTitle(oldTitle);
    setDescription(oldDescription);
  }, [isOpen]);
  return (
    <div ref={bgEleRef} onClick={cancelClickHandler} className={clsx("absolute top-0 left-0 size-full [background-color:rgba(25,25,25,0.7)] flex flex-row items-center",
      { "hidden": !isOpen })}>
      <div className={"w-96 h-96 px-8 py-8 bg-primary m-auto"}>
        <button onClick={xClickHandler} className={"btn btn-square btn-outline border-0 bg-primary h-8 min-h-8 w-8 text-base-100 float-end -mr-6 -mt-6"}>
          <XMarkIcon className={""}/>
        </button>
        <input value={title} placeholder={"输入您的主题..."} type={"text"} onChange={titleChangeHandler}
               className={"w-[95%] p-2 mb-4 font-bold text-2xl text-base-100 bg-primary placeholder:italic"}/>
        <textarea value={description} placeholder={"输入您的描述..."} onChange={descriptionChangeHandler}
                  className={"w-full h-[75%] min-h-[20%] max-h-[75%] mb-1 p-2 text-base-100 bg-primary placeholder:italic"}/>
        <button onClick={applyClickHandler} disabled={title.length<=0}
                className={clsx("btn h-8 min-h-8 -mr-4 btn-base-100 float-end hover:btn-secondary disabled:text-primary")}>确定</button>
      </div>
    </div>
  )
}