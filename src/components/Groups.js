import React from 'react';
import { Switch } from 'antd';

function Groups({ store, handleGroupName, handleCurrentGroup,
    clearGroupName, deleteGroup, currentGroup, setCurrentGroup, groupName,
    toggleAllTasks, lightMode, setToggleAllTasks, setLightMode, dispatch }) {

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

    const toggleTasks = () => {
        setToggleAllTasks(!toggleAllTasks);
        setCurrentGroup(null)
    }

    const addGroupColor = (round) => {
        setActiveRound(round)
    }

    return (
        <div className={lightMode ? 'groupTasks light' : 'groupTasks'}>
            <div className="switchMode">
                {lightMode ? <i style={{color:'#222226', fontSize: '22px'}} className="fas fa-sun"></i> : <i style={{color:'white', fontSize: '20px'}} className="fas fa-cloud-moon"></i>}
                <Switch autoFocus={false} defaultChecked={lightMode} onClick={() => setLightMode(!lightMode)} />
            </div>
            <div className="topMenu">
                <div onClick={toggleTasks} className={toggleAllTasks ? lightMode ? 'allTasksBlock active light' : 'allTasksBlock active' : lightMode ? 'allTasksBlock light' : 'allTasksBlock'}>
                    <i className="fas fa-bars"></i>
                    <span>Все задачи</span>
                </div>
            </div>
            <div className={lightMode ? 'groupTitle light' : 'groupTitle'}>
                <p>Группы</p>
            </div>
            <div className='groupList'>
                {store && store.items.length > 0 ? store.items.map((obj, id) => {
                    return (
                        <div key={`${obj.color}_${obj.name}`} className='groupItem' onClick={() => handleCurrentGroup(id)}>
                            <div className={id === currentGroup ? `${obj.color} active` : obj.color}></div>
                            <span>{obj.name} <b>({obj.tasks?.length})</b></span>
                            <i className="fas fa-times" onClick={() => deleteGroup(id)}></i>
                        </div>
                    )
                }) :
                    <div className="freeGroup">
                        {!toggleGroup ? <i style={{ color: lightMode ? '#222226' : '#999999' }} className="far fa-arrow-alt-circle-down"></i> : null}
                    </div>}
            </div>
            {!toggleGroup ? <div className={lightMode ? 'addGroup light' : 'addGroup'} onClick={() => setToggleGroup(true)}>
                <i className="fas fa-plus"></i>
                <div className='groupButton'>Добавить группу</div>
            </div> : <div className={lightMode ? 'windowGroup light' : 'windowGroup'}>
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
