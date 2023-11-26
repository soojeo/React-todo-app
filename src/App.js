import React, {useState, useCallback} from "react";
import "./App.css";
import List from "./components/Lists";
import Form from "./components/Form";

export default function App(){
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");
  const handleRemoveClick = ()=>{//할일 모두지우기
    setTodoData([]);
  };
  const handleClick = useCallback((id)=>{//filter method활용 
    let newTodoData = todoData.filter(data=>data.id !== id)//x버튼 누른 id와 다른 id들만 새로운 newTodoData에 넣어줌
    console.log('newTodoData', newTodoData)
    setTodoData(newTodoData);//todoData 세팅
  },[todoData]); 

  const handleSubmit=(e)=>{
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();
    //새로운 할 일 데이터
    let newTodo={
      id: Date.now(),
      title: value,
      complted: false,
    };
    //원래 있던 할 일 앞에 새로운 할일 더해주기
    setTodoData(prev=>[...prev, newTodo]);
    setValue("");
  }



  return(
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <List handleClick={handleClick} todoData={todoData} setTodoData = {setTodoData}/>
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>


      </div>
    </div>
  )
  
}