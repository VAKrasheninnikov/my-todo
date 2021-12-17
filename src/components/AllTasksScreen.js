import React from 'react'

function Taskscreen({ store, lightMode }) {

  return (
    <div className={lightMode ? 'taskScreen light' : 'taskScreen' }>
      <div className="workBlock">
        {store?.items?.map((obj, id) => {
          return (
            <span key={obj.name}>
              <div key={id} className={obj.color === null ? "taskHeader" : `taskHeader_${obj.color}`}>{obj.name}</div>
              <div className="taskList">
                <ul>
                  {obj?.tasks?.map((el, id) => {
                    return (
                      <li className={lightMode ? 'taskName light' : 'taskName'} key={el.name}>
                        <div className={el.completed ? 'taskRound_active': lightMode ? 'taskRound light' : 'taskRound'}></div>
                        <span >{el.name}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default Taskscreen
