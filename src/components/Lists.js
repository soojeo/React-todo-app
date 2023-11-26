import React from 'react'
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import List from "./List";

const Lists = React.memo(({todoData, setTodoData, handleClick}) => {
  const handleEnd=(result)=>{//tododata드래그한 액션으로 바꿔주는
    console.log('result', result);
    if (!result.destination) return;
    const newTodoData = todoData;
    //1. 변경시키는 아이템을 배열에서 지워줍니다.
    //2. return 값으로 지워진 아이템을 잡아줍니다.
    const [reorderItem] = newTodoData.splice(result.source.index, 1);//원래 있던 index 잡아주기
    //원하는 자리에 reorderItem을 insert 하기
    newTodoData.splice(result.destination.index, 0 , reorderItem);
    setTodoData(newTodoData);//교체
  }  
  return (
    <div>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId='todo'>
            {(provided)=>(//droppable에서 전달하는 정보를 아래 div요소로 전달
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todoData.map((data, index)=>(//62줄 체크박스 선택시 해당 data의 id를 인자로 전달하여 handleCompleteChange에 전달 
                    <Draggable 
                      key={data.id}
                      draggableId={data.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (//draggable 값 넣어주기
                        <List
                          handleClick={handleClick}
                          key ={data.id}
                          id={data.id}
                          title={data.title}
                          completed={data.completed}
                          todoData={todoData}
                          setTodoData={setTodoData}
                          provided={provided}
                          snapshot={snapshot}
                        />
                      )}
                    </Draggable>
                ))}  
                {provided.placeholder}                
              </div>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  )
})

export default Lists;
