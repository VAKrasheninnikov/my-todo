import React from 'react'

function Taskscreen({ store, dispatch, currentGroup, lightMode }) {

  const [toggleTask, setToggleTask] = React.useState(false);
  const [taskText, setTaskText] = React.useState('');
  const [toggleRewriteTask, setToggleRewriteTask] = React.useState(false);
  const [currentRewrite, setCurrentRewrite] = React.useState('');
  const [rewriteText, setRewriteText] = React.useState('');

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
    if (taskText!=='') {
      setToggleTask(false)
    }
  }

  const completeTask = (name, id, obj) => {
    const uniqIdentifier = `${name}_${id}_${obj}`
    dispatch({
      type:'COMPLETE_TASK',
      payload:uniqIdentifier
    })
  }

  const rewriteTask = () => {
    dispatch ({
      type: rewriteText ===''? 'INCORRECT' : 'REWRITE_TASK',
      identifier:currentRewrite,
      payload: rewriteText
    })
    if (rewriteText!==''){
      setToggleRewriteTask(false)
    }
  }

  const toggleRewrite = (name, id, obj) => {
    const uniqIdentifier = `${name}_${id}_${obj}`
    setToggleRewriteTask(true);
    setCurrentRewrite(uniqIdentifier)
    setRewriteText(name)
  }

  const handleRewrite = (event) => {
    setRewriteText(event.target.value)
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

  const cancelRewrite = () => {
    setToggleRewriteTask(false);
    setCurrentRewrite('');
    setRewriteText('');
  }


  return (
    <div className={lightMode ? 'taskScreen light' : 'taskScreen' }>
      {currentGroup !== null ? <div className="workBlock">
        {store?.items?.map((obj, id) => {
          return (
            <span key={obj.name}>
              <div key={`${obj.name}_${obj.id}`} className={id === currentGroup ? obj.color === null ? "taskHeader" : `taskHeader_${obj.color}` : "hiddenHeader"}>{id === currentGroup ? obj.name : null}</div>
              <div  className={id === currentGroup ? "taskList" : "taskListHidden"}>
                <ul>
                  {obj?.tasks?.map((el, id) => {
                    return (
                      <li key={el.name} className={lightMode ? 'taskName light' : 'taskName'} >
                        <div className={el.completed ? 'taskRound_active pointed': lightMode ? 'taskRound pointed light' : 'taskRound pointed'} onClick={()=>completeTask(el.name, id, obj.name)}></div>
                        <span >{el.name}</span>
                        <i className="fas fa-times" onClick={()=>deleteTask(el.name, id, obj.name)}></i>
                        <i className="far fa-edit" onClick={()=>toggleRewrite(el.name, id, obj.name)}></i>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </span>
          )
        })}
        {!toggleRewriteTask ? !toggleTask ? <div className='addGroup' onClick={() => setToggleTask(true)}>
          <i className="fas fa-plus"></i>
          <div>Добавить задачу</div>
        </div>
          :
          <div className={lightMode ? 'windowGroup light': 'windowGroup'}>
            <input type='text' placeholder='Название задачи...' value={taskText} onChange={handleTastText} />
            <div className='buttonChoice'>
              <button onClick={addTask}>Добавить</button>
              <button className='cancel' onClick={cancelTask}>Отмена</button>
            </div>
          </div> : <div className={lightMode ? 'windowRewriteGroup light' : 'windowRewriteGroup'}>
            <input type='text' placeholder='Редактируйте...' value={rewriteText} onChange={handleRewrite} />
            <div className='buttonChoice'>
              <button onClick={rewriteTask}>Редактировать</button>
              <button className='cancel' onClick={cancelRewrite}>Отмена</button>
            </div>
          </div>}
      </div> : 
      <span className="altText">Выберите группу...</span>}
    </div>
  )
}

export default Taskscreen
