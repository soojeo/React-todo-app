import React from 'react'

export default function ({todoData, setTodoData}) {
    
  const btnStyle={
    color:"#fff",
    border:"none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor:"pointer",
    float:"right"
  };
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
  const getStyle = (completed) => {
    return{
      padding:"10px",
      borderBottom:"1px #ccc dotted",
      textDecoration: completed ? "line-through":"none",
    };
  };

  return (
    <div>
        {todoData.map((data)=>(//62줄 체크박스 선택시 해당 data의 id를 인자로 전달하여 handleCompleteChange에 전달 
            <div style = {getStyle(data.completed)} key={data.id}>
            <input type="checkbox" defaultChecked={false} onChange={()=> handleCompleteChange(data.id)}/>
            {data.title}
            <button style={btnStyle} onClick={()=>handleClick(data.id)}>x</button>
            </div>          
        ))}
    </div>
  )
}
