import React, { Component } from 'react';
import uuid from 'uuid';

export class ToDoList extends Component {
  constructor(props){
    super(props)
    this.addTask = this.addTask.bind(this)
    this.state = {
      tasks:[]
    }
    this.deleteTask = this.deleteTask.bind(this)
  }


addTask(){
  let tasks = this.state.tasks;
  tasks.push({
    title:this.inputElement.value,
    id:uuid.v4()
  })

  this.setState({
    tasks:tasks
  })
  this.inputElement.value=""
}


deleteTask(index){
  let newArray = this.state.tasks
  newArray.splice(index,1)

  this.setState({
    tasks:newArray
  })

}

  render() {
    return (
      <div className="container">
      <div className="row">
      <div className="col-md-6 offset-3">
        <h1>To Do List </h1>
        <input type="text" ref={(a)=> this.inputElement=a} placeholder="Enter your task"/>
        <button className="btn btn-info btn-sm" onClick={this.addTask}>Add</button>
        <ToDoListItem tasks={this.state.tasks} onDelete={this.deleteTask}/>
        </div>
        </div>
      </div>
    );
  }
}


export class ToDoListItem extends Component {

  render() {
    let task = this.props.tasks.map((item,index)=> <li className="item_style list-group-item justify-content-between">{item.title}<input type="hidden" value={item.id}/><button className="btn btn-info" onClick={()=>this.props.onDelete(index)}>Delete</button></li>)
    return(
      <div className="card">
        <ul className="list-group">
      {task}
        </ul>
      </div>
    )
  }
}
