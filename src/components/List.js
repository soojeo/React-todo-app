import React,{useState} from 'react'


export const List = ({
    id, title, completed, todoData, setTodoData, provided, snapshot, handleClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title)
  const handleCompleteChange = (id)=>{//체크 상태 전환
    let newTodoData = todoData.map(data=>{
      if(data.id === id){//체크한 id라면
        data.completed = !data.completed;//data의 complete상태를 바꿔줌
      }
      return data;
    })
    setTodoData(newTodoData);//최신화
  }; 
  const handleEditChange =(event)=>{
    setEditedTitle(event.target.value);
  };
  const handleSubmit=()=>{
    let newTodoData = todoData.map((data)=>{
        if (data.id === id){
            data.title = editedTitle;
        }
        return data;
    });    
        setTodoData(newTodoData)
        setIsEditing(false);
    
  };
  if(isEditing){
    return(
        <div 
            className={'flex items-center justify-between w-full px-4 py-1 my-2  text-gray-600 bg-gray-100 border rounded'}
        >
            <div className='item-center'>
                <form onSubmit={handleSubmit}>
                    <input value={editedTitle} onChange={handleEditChange} className='w-full px-3 py-2 mr-4 text-grey-500 rounded'/>
                </form>               
            </div>
            <div className='item-center'>
                <button className='px-4 py-2 float-right'onClick={()=>setIsEditing(false)}>x</button>   
                <button onClick={handleSubmit} className='px-4 py-2 float-right' type='submit'>save</button>   
            </div>   
        </div>  
    ) 
  } else{
    return (
        <div 
            key={id} 
            {...provided.draggableProps} 
            ref={provided.innerRef} 
            {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
        >
            <div className='item-center'>
                <input type="checkbox" defaultChecked={false} onChange={()=> handleCompleteChange(id)}/>
                <span className={completed ? "line-through":undefined}>{title} </span>                 
            </div>
            <div className='item-center'>
                <button className='px-4 py-2 float-right'onClick={()=>handleClick(id)}>x</button>   
                <button className='px-4 py-2 float-right'onClick={()=>setIsEditing(true)}>edit</button>   
            </div>   
        </div>     
    )    
  }

}
export default List;