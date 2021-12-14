import React from 'react'
import outOfGroup from '../styles/outOfGroup.jpg'

function Taskscreen({ store, dispatch, currentGroup, refTaskName, toggleTestBlock }) {

  const [toggleTask, setToggleTask] = React.useState(false);
  const [taskText, setTaskText] = React.useState('');

  const handleTastText = (event) => {
    setTaskText(event.target.value)
  }

  const addTask = () => {
    dispatch({
      type: 'ADD_TASK',
      payload: currentGroup,
      text: taskText
    })
    setTaskText('');
    setToggleTask(false);
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
                  {obj?.tasks?.map((el) => {
                    return (
                      <li key={el.name}>
                        <div className='taskRound'></div>
                        <span >{el.name}</span>
                        <i className="fas fa-times"></i>
                        <i className="far fa-edit"></i>
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
              <button className='cancel' onClick={cancelTask} >Отмена</button>
            </div>
          </div>}
      </div> : 
      <span>Выберите группу</span>}
        
    </div>
  )
}

export default Taskscreen
