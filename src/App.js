import React from "react";
import Groups from "./components/Groups";
import Taskscreen from "./components/Taskscreen";
import './styles/wrapper.scss';
import {reducer} from './reducer'

function App() {

  const initialState = null;

  const [store, dispatch] = React.useReducer(reducer,initialState);

  const [groupName, setGroupName] = React.useState('');

  console.log(groupName)

  const handleGroupName = (event) => {
    setGroupName(event.target.value)
  }

  const clearGroupName = () => {
    setGroupName('');
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
        clearGroupName={clearGroupName}/>
        <Taskscreen />
      </div>
    </div>
  );
}

export default App;
