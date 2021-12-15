import React from 'react'

function Groups({ store, handleGroupName, handleCurrentGroup, clearGroupName, deleteGroup, currentGroup, groupName, dispatch }) {

    const [toggleGroup, setToggleGroup] = React.useState(false);

    const colors = ['redround', 'greenround', 'yellowround'];
    const [activeRound, setActiveRound] = React.useState(null);



    const hideGroupWindow = () => {
        setToggleGroup(false);
        clearGroupName();
        setActiveRound(null)
    }

    const addGroupName = () => {
        dispatch({
            type: groupName === '' ? 'INCORRECT' : 'ADD_GROUP',
            payload: groupName,
            colorPayload: activeRound
        })
        setToggleGroup(groupName !== '' ? false : true);
        clearGroupName();
        setActiveRound(null);
    }

    const addGroupColor = (round) => {
        setActiveRound(round)
    }


    return (
        <div className='groupTasks'>
            <div className='allTasksBlock'>
                <i className="fas fa-bars"></i>
                <span>Все задачи</span>
            </div>
            <div className='groupTitle'>
                <p>Группы</p>
            </div>
            <div className='groupList'>
                {store && store.items.length > 0 ? store.items.map((obj, id) => {
                    return (
                        <div key={`${obj.color}_${obj.name}`} className='groupItem' onClick={() => handleCurrentGroup(id)}>
                            <div className={id===currentGroup ? `${obj.color} active` : obj.color}></div>
                            <span>{obj.name} <b>{obj.tasks?.length}</b></span>
                            <i className="fas fa-times" onClick={() => deleteGroup(id)}></i>
                        </div>
                    )
                }) :
                    <div className="freeGroup">
                        {!toggleGroup?<i className="far fa-arrow-alt-circle-down"></i>:null}
                    </div>}
            </div>
            {!toggleGroup ? <div className='addGroup' onClick={() => setToggleGroup(true)}>
                <i className="fas fa-plus"></i>
                <div className='groupButton'>Добавить группу</div>
            </div> : <div className='windowGroup'>
                <input maxLength={22} type='text' placeholder='Название группы...' value={groupName} onChange={handleGroupName} />
                <div className='roundChoice'>
                    {colors.map((round, index) => {
                        return (
                            <div className={activeRound === round ? `${round}_active` : round} key={index} onClick={() => addGroupColor(round)}></div>
                        )
                    })}
                </div>
                <div className='buttonChoice'>
                    <button onClick={addGroupName}>Добавить</button>
                    <button className='cancel' onClick={hideGroupWindow}>Отмена</button>
                </div>
            </div>}
        </div>
    )
}

export default Groups
