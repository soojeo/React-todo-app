import React from 'react'
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
export default function ({todoData, setTodoData}) {
  const handleCompleteChange = (id)=>{//체크 상태 전환
    let newTodoData = todoData.map(data=>{
      if(data.id === id){//체크한 id라면
        data.completed = !data.completed;//data의 complete상태를 바꿔줌
      }
      return data;
    })
    setTodoData(newTodoData);//최신화
  };
  const handleClick = (id)=>{//filter method활용 
    let newTodoData = todoData.filter(data=>data.id !== id)//x버튼 누른 id와 다른 id들만 새로운 newTodoData에 넣어줌
    console.log('newTodoData', newTodoData)
    setTodoData(newTodoData);//todoData 세팅
  };
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
                        <div 
                          key={data.id} 
                          {...provided.draggableProps} 
                          ref={provided.innerRef} 
                          {...provided.dragHandleProps}
                          className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
                        >
                            <div className='item-center'>
                              <input type="checkbox" defaultChecked={false} onChange={()=> handleCompleteChange(data.id)}/>
                              <span className={data.completed ? "line-through":undefined}>{data.title} </span>                 
                            </div>
                            <div className='item-center'>
                              <button className='px-4 py-2 float-right'onClick={()=>handleClick(data.id)}>x</button>   
                            </div>   
                        </div>                         
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
}
