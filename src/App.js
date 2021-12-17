import React from "react";
import Groups from "./components/Groups";
import Taskscreen from "./components/Taskscreen";
import AllTaskscreen from "./components/AllTasksScreen"
import './styles/wrapper.scss';
import 'antd/dist/antd.css';
import { reducer } from './reducer'

function App() {

  const stringified = localStorage.getItem('store');
  const actualMode = localStorage.getItem('lightMode');
  const initialState = JSON.parse(stringified) ? JSON.parse(stringified) : null;

  const [store, dispatch] = React.useReducer(reducer, initialState);
  const [lightMode, setLightMode] = React.useState(JSON.parse(actualMode) ===! null || undefined ? JSON.parse(actualMode) : false)
  const [toggleAllTasks, setToggleAllTasks] = React.useState(false);
  const [currentGroup, setCurrentGroup] = React.useState(null);
  const [groupName, setGroupName] = React.useState('');

  React.useEffect(()=> {
    localStorage.setItem('store', JSON.stringify(store))
  }, [store])

  React.useEffect(()=> {
    localStorage.setItem('lightMode', JSON.stringify(lightMode))
  }, [lightMode])

  const handleGroupName = (event) => {
    setGroupName(event.target.value)
  }

  const clearGroupName = () => {
    setGroupName('');
  }


  const handleCurrentGroup = (id) => {
    setCurrentGroup(id)
    setToggleAllTasks(false)
  }

  const deleteGroup = (id) => {
    dispatch({
      type: 'DELETE_GROUP',
      payload: id,
    });
  }

  React.useEffect(() => {
    setCurrentGroup(null);
  }, [store?.items.length])

  return (
    <div className='mainScreen'>
      <Groups
        store={store}
        groupName={groupName}
        toggleAllTasks={toggleAllTasks}
        currentGroup={currentGroup}
        lightMode={lightMode}
        dispatch={dispatch}
        setLightMode={setLightMode}
        setToggleAllTasks={setToggleAllTasks}
        setCurrentGroup={setCurrentGroup}
        handleGroupName={handleGroupName}
        clearGroupName={clearGroupName}
        deleteGroup={deleteGroup}
        handleCurrentGroup={handleCurrentGroup}
      />
      {toggleAllTasks ?
        <AllTaskscreen
          store={store}
          lightMode={lightMode}
        /> :
        <Taskscreen
          store={store}
          lightMode={lightMode}
          currentGroup={currentGroup}
          toggleAllTasks={toggleAllTasks}
          dispatch={dispatch}
        />}
    </div>
  );
}

export default App;
