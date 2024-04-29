import {PencilSquareIcon} from "@heroicons/react/24/solid";

export default function Header({title, description, changeProjectInfo}) {
  const clickHandler = ()=>{
    changeProjectInfo();
  }
  return (
    <div className="w-full min-h-16 mb-4 px-4">
      <h1 className="inline-block text-primary text-3xl mt-4 mb-2 mr-2">{title}</h1>
      <button onClick={clickHandler} className={"btn btn-square btn-outline border-0 w-6 h-6 min-h-6 text-primary hover:text-secondary hover:bg-base-100"}>
        <PencilSquareIcon className={"w-6 h-6"}/>
      </button>
      <p className="">{description}</p>
    </div>
  )
}