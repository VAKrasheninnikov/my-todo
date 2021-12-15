import React from 'react'

function Taskscreen({ store, dispatch, currentGroup, refTaskName }) {

  const [toggleTask, setToggleTask] = React.useState(false);
  const [taskText, setTaskText] = React.useState('');
  const [toggleRewriteTask, setToggleRewriteTask] = React.useState(false);


  const handleTastText = (event) => {
    setTaskText(event.target.value)
  }

  const addTask = () => {
    dispatch({
      type: taskText === '' ? 'INCORRECT' : 'ADD_TASK',
      payload: currentGroup,
      text: taskText
    })
    setTaskText('');
    setToggleTask(false);
  }

  const completeTask = (name, id, obj) => {
    const uniqIdentifier = `${name}_${id}_${obj}`
    dispatch({
      type:'COMPLETE_TASK',
      payload:uniqIdentifier
    })
  }

  const rewriteTask = (name) => {
    setTaskText(name);
    setToggleTask(true);
  }

  const deleteTask = (name, id, obj) => {
    const uniqIdentifier = `${name}_${id}_${obj}`
    dispatch({
      type: 'DELETE_TASK',
      payload:uniqIdentifier
    })
  }

  const cancelTask = () => {
    setToggleTask(false);
    setTaskText('');
  }


  return (
    <div className='taskScreen'>
      {currentGroup !== null ? <div className="workBlock">
        {store?.items?.map((obj, id) => {
          return (
            <>
              <div ref={refTaskName} key={id} className={id === currentGroup ? obj.color === null ? "taskHeader" : `taskHeader_${obj.color}` : "hiddenHeader"}>{id === currentGroup ? obj.name : null}</div>
              <div className={id === currentGroup ? "taskList" : "taskListHidden"}>
                <ul>
                  {obj?.tasks?.map((el, id) => {
                    return (
                      <li key={el.name}>
                        <div className={el.completed ? 'taskRound_active':'taskRound'} onClick={()=>completeTask(el.name, id, obj.name)}></div>
                        <span >{el.name}</span>
                        <i className="fas fa-times" onClick={()=>deleteTask(el.name, id, obj.name)}></i>
                        <i className="far fa-edit" onClick={()=>rewriteTask(el.name)}></i>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          )
        })}
        {!toggleTask ? <div className='addGroup' onClick={() => setToggleTask(true)}>
          <i className="fas fa-plus"></i>
          <div>Добавить задачу</div>
        </div>
          :
          <div className='windowGroup'>
            <input type='text' placeholder='Название задачи...' value={taskText} onChange={handleTastText} />
            <div className='buttonChoice'>
              <button onClick={addTask}>Добавить</button>
              <button className='cancel' onClick={cancelTask}>Отмена</button>
            </div>
          </div>}
      </div> : 
      <span className="altText">Выберите группу...</span>}
        
    </div>
  )
}

export default Taskscreen
