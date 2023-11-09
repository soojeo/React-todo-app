import React, {Component} from "react";
import "./App.css";
export default class App extends Component{
  btnStyle={
    color:"#fff",
    border:"none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor:"pointer",
    float:"right"
  };
  getStyle = () => {
    return{
      padding:"10px",
      borderBottom:"1px #ccc dotted",
      textDecoration:"none"
    };
  };
  state ={
    todoData:[
      {
        id:"1",
        title:"공부하기",
        completed: true
      },
      {
        id:"2",
        title:"청소하기",
        completed: false      
      }   
    ],
    value:"",//새로 반환된 리스트를 넣어줄 공간
  };
  handleClick = (id)=>{//filter method활용 
    let newTodoData = this.state.todoData.filter(data=>data.id !== id)//x버튼 누른 id와 다른 id들만 새로운 newTodoData에 넣어줌
    console.log('newTodoData', newTodoData)
    this.setState({todoData:newTodoData})//todoData 세팅
  }
  handleChange=(e)=>{
    this.setState({value: e.target.value});
  }
  handleSubmit=(e)=>{
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();
    //새로운 할 일 데이터
    let newTodo={
      id: Date.now(),
      title: this.state.value,
      complted: false,
    };
    //원래 있던 할 일 앞에 새로운 할일 더해주기
    this.setState({todoData:[...this.state.todoData, newTodo]});
  }
  render(){
    return(
      <div className = "container">
        <div className = "todoBlock">
          <div className = "title">
            <h1>할 일 목록</h1>
          </div>

          {this.state.todoData.map((data)=>(
            <div style = {this.getStyle()} key={data.id}>
              <input type="checkbox" defaultChecked={false}/>
              {data.title}
              <button style={this.btnStyle} onClick={()=>this.handleClick(data.id)}>x</button>
            </div>          
          ))}
            <form style={{display: 'flex'}} onSubmit={this.handleSubmit}>
              <input type="text" name="value" style={{flex:'10', padding:'5px'}}
                placeholder="해야 할 일을 입력하세요." 
                value={this.state.value}//unchange event활용
                onChange={this.handleChange}
              />
              <input
                type="submit"
                value="입력"
                className="btm"
                style={{flex:'1'}}
              />

            </form>

        </div>
      </div>
    )
  }
}