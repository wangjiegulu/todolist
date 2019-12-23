import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import 'antd/dist/antd.css'
import styles from "./index.module.css";
import { Input, Button, List, Checkbox, Icon } from 'antd';
import { Task, TaskStatus } from "../model/Task";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

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
    // like `componentDidMount()`
    addTask(
      new Task('Vanilla JavaScript'),
      new Task('Vue.js'),
      new Task('React.js'),
      new Task('Node.js')
    )

    return ()=>{
        // like `componentWillUnmount()`
        
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
    })
  }

  return (
    <div className={styles.root}>
        <label className={styles.title}>TO-DO LIST</label>
        <div className={styles.addTaskView}>
          <Input 
            placeholder="New Task" 
            value={formData.taskInputText} 
            className={styles.addTaskInput} 
            onChange={(event)=>{
              changeFormData({taskInputText: event.target.value})
            }}
            />
          <Button type="primary" className={styles.addTaskSubmit} onClick={()=>onSubmitClick()}>ADD</Button>
        </div>
        <div className={styles.tasks}>
          <List
            className={styles.taskList}
            bordered={false}
            dataSource={tasks}
            renderItem={(item)=>{
              return <List.Item className={styles.taskItem}>
                <Checkbox 
                  defaultChecked={item.isDoneStatus()} 
                  onChange={e=>{onTaskItemStatusChange(e, item.id)}}
                  />
                <label className={styles[`taskItemTitle-${TaskStatus[item.taskStatus]}`]}>
                  {item.content}
                </label>
                <div style={{flexGrow: 1}}></div>
                <Icon type="delete" onClick={()=>deleteTask(item)}/>
              </List.Item>
            }}
          />
          {tasks.length > 0 && <Button type="link" className={styles.clear} onClick={onClearClick}>Clear</Button>}
        </div>
    </div>
  );
}

Main.propTypes = {
};

Main.defaultProps = {
};

export default withRouter(Main);