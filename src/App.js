import React from "react";
import Groups from "./components/Groups";
import Taskscreen from "./components/Taskscreen";
import './styles/wrapper.scss';
import { reducer } from './reducer'

function App() {

  const initialState = null;

  const [store, dispatch] = React.useReducer(reducer, initialState);


  const [currentGroup, setCurrentGroup] = React.useState(null);
  const [groupName, setGroupName] = React.useState('');
 
  console.log(currentGroup)

  const handleGroupName = (event) => {
    setGroupName(event.target.value)
  }

  const clearGroupName = () => {
    setGroupName('');
  }

  const deleteGroup = (id) => {
    dispatch({
      type: 'DELETE_GROUP',
      payload: id,
    })
  }

  const handleCurrentGroup = (id) => {
    
    setCurrentGroup(id)
  }

  console.log(store)


  return (
    <div className="wrapper">
      <div className='mainScreen'>
        <Groups
          store={store}
          dispatch={dispatch}
          groupName={groupName}
          handleGroupName={handleGroupName}
          clearGroupName={clearGroupName}
          deleteGroup={deleteGroup}
          handleCurrentGroup={handleCurrentGroup}
        />
        <Taskscreen
          store={store}
          dispatch={dispatch}
          currentGroup={currentGroup}
        />
      </div>
    </div>
  );
}

export default App;
