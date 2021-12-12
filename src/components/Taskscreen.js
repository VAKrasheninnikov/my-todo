import React from 'react'

function Taskscreen() {
    return (
        <div className='taskScreen'>
        <div className="workBlock">
          <div className="taskHeader">Домашние задачи</div>
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
            <div className='addGroup'>
              <i className="fas fa-plus"></i>
              <div>Добавить задачу</div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Taskscreen
