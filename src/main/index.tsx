import React, { useState, useEffect } from "react"
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom"
import 'antd/dist/antd.css'
import './style.css'
import { Input, Button, List, Checkbox, Icon } from 'antd'
import { Task, TaskStatus } from "../model/Task"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function Main(props: any) {
  const [formData, setFormData] = useState({
    taskInputText: ''
  })
  
  const changeFormData = (data: any) => {
    setFormData(prev => {
      return { ...prev, ...data };
    });
  };
  const [tasks, setTasks] = useState<Array<Task>>([])
  
  useEffect(() => {
    addTask(
      new Task('Vanilla JavaScript'),
      new Task('Vue.js'),
      new Task('React.js'),
      new Task('Node.js')
    )

    return ()=>{
        
    }
  }, []);

  const addTask = (...toAddTasks: Array<Task>) => {
    setTasks(prev => {
      return [...toAddTasks.reverse(), ...prev];
    });
  };
  const deleteTask = (...toDeleteTasks: Array<Task>) => {
    setTasks(prev => {
      let result = prev.filter((item)=>{ return toDeleteTasks.filter(toDeleteTask=>{return item.id === toDeleteTask.id}).length <= 0 })
      return result
    })
  }

  let onClearClick = ()=>{
    if(tasks.length > 0){
      setTasks(prev=>{
        return []
      })
    }
  }

  let onSubmitClick = ()=>{
    if(formData.taskInputText){
      addTask(new Task(formData.taskInputText))
      changeFormData({taskInputText: ''})
    }
  }

  let onTaskItemStatusChange = (e: CheckboxChangeEvent, toChangeTaskId: number)=>{
    setTasks(prev => {
      return prev.map(item=>{return item.id === toChangeTaskId ? item.setDoneStatus(e.target.checked) : item})
          .sort((a, b)=>{ return a.taskStatus === b.taskStatus ? b.id - a.id : a.taskStatus - b.taskStatus })
    })
  }

  let renderList = ()=>{
    return <TransitionGroup style={{width: '100%'}} appear={false}>
    {tasks.map((item)=>{
      return <CSSTransition
        key={item.id}
        timeout={300}
        classNames="main-transition-task-item"
      >
      {/* <div className="task-item" key={item.id}> */}
      <div className={`main-task-item main-task-item-${TaskStatus[item.taskStatus]}`} key={item.id}>
        <Checkbox 
            defaultChecked={item.isDoneStatus()} 
            onChange={e=>{onTaskItemStatusChange(e, item.id)}}
            />
          <label className={`main-task-item-title main-task-item-title-${TaskStatus[item.taskStatus]}`}>
          {item.content}
          </label>
          <div style={{flexGrow: 1}}></div>
          <Icon type="delete" onClick={()=>deleteTask(item)}/>
      </div>
      </CSSTransition>
    })}
  </TransitionGroup>
  }

  return (
    <div className="main-root">
        <label className="main-title">TO-DO LIST</label>
        <div className="main-add-task-view">
          <Input 
            placeholder="New Task" 
            value={formData.taskInputText} 
            className="main-add-ask-input"
            onChange={(event)=>{
              changeFormData({taskInputText: event.target.value})
            }}
            />
          <Button type="primary" className="main-add-task-submit" onClick={()=>onSubmitClick()}>ADD</Button>
        </div>
        <div className="main-tasks">
          { tasks.length > 0 ? renderList() : <div className="main-no-data">NO TASK</div> }
          { tasks.length > 0 && <Button type="link" className="main-clear" onClick={onClearClick}>Clear</Button> }
        </div>
    </div>
  );
}

Main.propTypes = {
};

Main.defaultProps = {
};

export default withRouter(Main);