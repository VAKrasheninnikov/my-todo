import React, { useRef } from "react";
import Groups from "./components/Groups";
import Taskscreen from "./components/Taskscreen";
import './styles/wrapper.scss';
import { reducer } from './reducer'

function App() {

  const initialState = null;

  const [store, dispatch] = React.useReducer(reducer, initialState);
  console.log(store)
  
  const [currentGroup, setCurrentGroup] = React.useState(null);
  const [groupName, setGroupName] = React.useState('');


  const handleGroupName = (event) => {
    setGroupName(event.target.value)
  }

  const clearGroupName = () => {
    setGroupName('');
  }


  const handleCurrentGroup = (id) => {
    setCurrentGroup(id)
  }

  const deleteGroup = (id) => {
    dispatch({
      type: 'DELETE_GROUP',
      payload: id,
    });
  }

  const refTaskName = useRef()

  React.useEffect(()=>{ 
      setCurrentGroup(null);
  },[store?.items.length])

  return (
    <div className="wrapper">
      <div className='mainScreen'>
        <Groups
          store={store}
          groupName={groupName}
          currentGroup={currentGroup}
          dispatch={dispatch}
          handleGroupName={handleGroupName}
          clearGroupName={clearGroupName}
          deleteGroup={deleteGroup}
          handleCurrentGroup={handleCurrentGroup}
        />
        <Taskscreen
          store={store}
          currentGroup={currentGroup}
          refTaskName={refTaskName}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}

export default App;
