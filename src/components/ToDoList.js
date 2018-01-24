import React, { Component } from 'react';


export class ToDoList extends Component {
  constructor(props){
    super(props)
    this.addTask = this.addTask.bind(this)
    this.state = {
      tasks:[]
    }
  }


addTask(){
  let tasks = this.state.tasks;
  tasks.push({
    title:this.inputElement.value
  })

  this.setState({
    tasks:tasks
  })
  this.inputElement.value=""
}

  render() {
    return (
      <div className="container">
      <div className="row">
      <div className="col-md-6 offset-3">
        <h1>To Do List </h1>
        <input type="text" ref={(a)=> this.inputElement=a} placeholder="Enter your task" required/>
        <button className="btn btn-info btn-sm" onClick={this.addTask}>Add</button>
        <ToDoListItem tasks={this.state.tasks}/>
        </div>
        </div>
      </div>
    );
  }
}

export class ToDoListItem extends Component {
  constructor(props){
    super(props)
    this.deleteTask = this.deleteTask.bind(this)
  }

  deleteTask(){
    let newArray = this.props.tasks
    newArray.map(function (index) {
      console.log(index)
    })
  }

  render() {
    let task = this.props.tasks.map((item)=> <li className="item_style list-group-item justify-content-between">{item.title}<button className="btn btn-info" onClick={this.deleteTask}>Delete</button></li>)
    return(
      <div className="card">
        <ul className="list-group">
      {task}
        </ul>
      </div>
    )
  }
}
