import React, { Component } from 'react';
import uuid from 'uuid';

export class ToDoList extends Component {
  constructor(props){
    super(props)
    this.addTask = this.addTask.bind(this)
    this.state = {
      tasks:[],
      completed:[]
    }
    this.deleteTask = this.deleteTask.bind(this)
    this.moveTask = this.moveTask.bind(this)
    this.completeDeleteTask = this.completeDeleteTask.bind(this)
    this.switchTask = this.switchTask.bind(this)
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

completeDeleteTask(index){
  let newArray = this.state.completed
  newArray.splice(index,1)
  this.setState({
    completed:newArray
  })
}

moveTask(index){
  let newArray = this.state.tasks
  let completedArray = this.state.completed
  let title = this.state.tasks[index].title
  let id = this.state.tasks[index].id
  newArray.splice(index,1)

  this.setState({
    tasks:newArray
  })
  completedArray.push({
    title:title,
    id: id
  })
  this.setState({
    completed:completedArray
  })
}

switchTask(index){
  let newArray = this.state.tasks
  let completedArray = this.state.completed
  let title = this.state.completed[index].title
  let id = this.state.completed[index].id
  console.log(title)
  completedArray.splice(index,1)

  this.setState({
   completed:completedArray
  })

  newArray.push({
    title:title,
   id: id
      })

  this.setState({
    tasks:newArray
  })
  console.log(completedArray)
}

  render() {
    return (
      <div className="container">
      <div className="row">
      <div className="col-md-6 offset-2">
        <h1 class="mt-3">To Do List </h1>
        <input type="text" ref={(a)=> this.inputElement=a} placeholder="Enter your task"/>
        <button className="btn btn-info btn-sm" onClick={this.addTask}>Add</button><p></p>
        <ToDoListItem tasks={this.state.tasks} completed={this.state.completed} onDelete={this.deleteTask} onCompleteDelete={this.completeDeleteTask} onComplete={this.moveTask} onIncomplete={this.switchTask}/>
        </div>
        </div>
      </div>
    );
  }
}


export class ToDoListItem extends Component {

  render() {
    let task = this.props.tasks.map((item,index)=> <li className="item_style list-group-item justify-content-between">{item.title}
    <input type="hidden" value={item.id}/>
    <button className="btn btn-info btn-sm" onClick={()=>this.props.onComplete(index)}>Mark as Completed</button>
    <button className="btn btn-danger btn-sm" onClick={()=>this.props.onDelete(index)}>Delete</button></li>)

    let completed = this.props.completed.map((item,index)=> <li className="item_style list-group-item justify-content-between">{item.title}
    <input type="hidden" value={item.id}/>
    <button className="btn btn-info btn-sm" onClick={()=>this.props.onIncomplete(index)}>Mark as Pending</button>
    <button className="btn btn-danger btn-sm" onClick={()=>this.props.onCompleteDelete(index)}>Delete</button></li>)



    return(
      <div className="card">
        <div>
        <h4 className="p-2">Pending Items </h4>
        <ul className="list-group">
      {task}
        </ul>
        </div>
        <div>
        <h4 className="p-2">Completed Items </h4>
        <ul className="list-group">
        {completed}
        </ul>
        </div>
      </div>
    )
  }
}
