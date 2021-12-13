import React from 'react'

function Taskscreen({ store, dispatch, currentGroup }) {

  const [toggleTask, setToggleTask] = React.useState(false);
  const [taskText, setTaskText] = React.useState('');
  console.log(currentGroup)
  const handleTastText = (event) => {
    setTaskText(event.target.value)
  }

  const addTask = () => {
    dispatch({
      type:'ADD_TASK',
      payload:currentGroup,
      text: taskText
    })
  }
  

  return (
    <div className='taskScreen'>
      <div className="workBlock">
        {store?.items?.map((obj, id) => {
          return (
            <div key={id} className={id === currentGroup ? obj.color === null ? "taskHeader" : `taskHeader_${obj.color}` : "hiddenHeader"}>{id === currentGroup ? obj.name : null}</div>
          )
        })}
        <div className="taskList">
          <ul>
            <li>
              <div className='taskRound'></div>
              <span>Помыть пол</span>
              <i className="fas fa-times"></i>
              <i className="far fa-edit"></i>
            </li>
            <li>
              <div className='taskRound'></div>
              <span>Купить хлеб</span>
              <i className="fas fa-times"></i>
              <i className="far fa-edit"></i>
            </li>
            <li>
              <div className='taskRound'></div>
              <span>Отдохнуть</span>
              <i className="fas fa-times"></i>
              <i className="far fa-edit"></i>
            </li>
          </ul>
        </div>
        {!toggleTask ? <div className='addGroup' onClick={()=>setToggleTask(true)}>
            <i className="fas fa-plus"></i>
            <div>Добавить задачу</div>
          </div>
          :
          <div className='windowGroup'>
            <input type='text' placeholder='Название задачи...' value={taskText} onChange={handleTastText}/>
            <div className='buttonChoice'>
              <button onClick={addTask}>Добавить</button>
              <button className='cancel' onClick={()=>setToggleTask(false)} >Отмена</button>
            </div>
          </div>}
      </div>

    </div>
  )
}

export default Taskscreen
