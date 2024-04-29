import './App.css';
import {DndContext, closestCorners, DragOverlay} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {useEffect, useRef, useState} from "react";

import { initialListsData, CardData } from './lib/data'
import { defaultAnnouncements} from "./lib/dndAnnouncements";
import Header from "./components/header";
import List from "./components/list";
import EditorOvercast from "./components/editorOvercast";
import Card from "./components/card";


function App() {
  const [projectTitle, setProjectTitle] = useState("一个非常困难的任务!");
  const [projectDescription, setProjectDescription] = useState("让我们把他分解, 一步一步地完成.😃");
  // Editor data
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [oldTitle, setOldTitle] = useState('');
  const [oldDescription, setOldDescription] = useState('');
  const [isDeletable, setIsDeletable] = useState(false);
  const [editorCallback, setEditorCallback] =useState();

  let listsData = JSON.parse(localStorage.getItem("lists"));
  if(listsData === null) {
    listsData = initialListsData;
  }
  // console.log(listsData);
  const [lists, setLists] = useState(listsData);
  const [activeId, setActiveId] = useState(null);
  const nuanceTimer = 100;

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, );

  function openEditor(open, title='', description='', isDeletable=false, callback=null) {
    setIsEditorOpen(open);
    setOldTitle(title);
    setOldDescription(description);
    setIsDeletable(isDeletable);
    // this ()=> is IMPORTANT to set a callback as state.
    setEditorCallback(()=>callback);
  }
  function changeProjectInfoHandler(){
    openEditor(true, projectTitle, projectDescription, false,
      (isApplied, title='', description='')=>{
        openEditor(false);
        if(!isApplied) return;
        setProjectTitle(title);
        setProjectDescription(description);
      }
    );
  }
  function addCardHandler(list){
    openEditor(true, '','', false,
      (isApplied, title='', description='')=>{
        openEditor(false);
        if(!isApplied) return;
        setLists(pre => {
          list.cards.push(new CardData(title, description, list.id==='done'));
          return pre;
        })
      }
    );
  }
  function changeCardInfoHandler(card){
    openEditor(true, card.title, card.description, true,
      (isApplied, title='', description='', deleted=false)=>{
        openEditor(false);
        if(!isApplied) return;
        if(deleted){
          setLists(pre => {
            pre.forEach(list => {
              list.cards = list.cards.filter(listCard=> listCard.id !== card.id);
            });
            return pre;
          })
          return;
        }
        setLists(pre =>{
          card.title = title;
          card.description = description;
          return pre;
        })
      }
    );
  }

  return (
    <div data-theme="codecademy" className="h-screen">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        <EditorOvercast isOpen={isEditorOpen} oldTitle={oldTitle}
                        oldDescription={oldDescription} isDeletable={isDeletable}
                        callback={editorCallback}/>
        <Header title={projectTitle} description={projectDescription} changeProjectInfo={changeProjectInfoHandler} />
        <DndContext collisionDetection={closestCorners} accessibility={{announcements:defaultAnnouncements}}
                    onDragStart={handleDragStart} onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}>
          <div className="w-full px-4 flex flex-row justify-center space-x-[2%]">
            <List list={lists[0]} addCardHandler={addCardHandler}/>
            <List list={lists[1]} addCardHandler={addCardHandler}/>
            <List list={lists[2]} addCardHandler={addCardHandler}/>
            <DragOverlay>{activeId? <Card cardData={findCard(activeId)}/>:null}</DragOverlay>
          </div>
        </DndContext>
      </div>
    </div>
  )

  // find the list which the id belongs to, return the list.
  function findContainer(id){
    let res = lists.find(list=>( list.id === id ||
      list.cards.find(card=>card.id === id) !== undefined
    ));
    return res;
  }
  function findCard(id){
    let res;
    lists.forEach(list=> {
      const card =  list.cards.find(card=>card.id === id);
      if(card !== undefined){
        res = card;
      }
    })
    return res;
  }
  function handleDragStart(event){
    const id = event.active.id;
    // console.log(id);
    setTimeout(()=>setActiveId(id),nuanceTimer);
    ;
  }
  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    // console.log({ id, overId, activeContainerId, overContainerId });

    // Container not in lists or moving in the same container
    if(!activeContainer||!overContainer|| activeContainer===overContainer) return;

    setLists(pre => {
      const activeCards = activeContainer.cards;
      const overCards = overContainer.cards;
      const activeIndex = activeCards.findIndex(card => card.id === id);
      let overIndex = overCards.findIndex(card => card.id === id); // overIndex may not exist.
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
    const { active, over, delta } = event;
    const { id } = active;
    const { id: overId } = over;
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    // Container not in lists or moving in the DIFFERENT container
    if(!activeContainer||!overContainer|| activeContainer!==overContainer) {
      setTimeout(()=> setActiveId(null), nuanceTimer);
      return;
    };

    // console.log(delta);
    if(activeId === null){
      console.log("this is a click");
      changeCardInfoHandler(activeContainer.cards.find(card=>card.id === active.id));
      setTimeout(()=> setActiveId(null), nuanceTimer);
      return;
    }

    console.log(activeId);
    findCard(activeId).isDone = activeContainer.id === 'done';
    if(active.id !== over.id){
      setLists((lists)=>{
        const cards = overContainer.cards;
        const oldIndex = cards.findIndex(card=> card.id===active.id);
        const newIndex = cards.findIndex(card=> card.id===over.id);
        overContainer.cards = arrayMove(cards, oldIndex, newIndex);
        return lists;
      });
    }
    setTimeout(()=> setActiveId(null), nuanceTimer);
  }
}

export default App;