import React, { useRef } from "react";
import Groups from "./components/Groups";
import Taskscreen from "./components/Taskscreen";
import './styles/wrapper.scss';
import { reducer } from './reducer'

function App() {

  const initialState = null;

  const [store, dispatch] = React.useReducer(reducer, initialState);

  
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
    if (store?.items.length-1) {
      setCurrentGroup(null);
    }
  },[store])

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
          refTaskName={refTaskName}
        />
      </div>
    </div>
  );
}

export default App;
