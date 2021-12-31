import './App.css';
import AddInput from './components/AddInput';
import Tasks from './components/Tasks';
import UpdateModal from './components/UpdateModal';
import React from 'react';

const AppContext = React.createContext();

function App() {

  //reducer
  function reducer(state, action) {
    let newState = [];
    switch(action.type)
    {
      case "add": return action.task ? [...state, action.task] : state;
      case "initialize": return action.tasks;
      case "update": 
        for(const task of state)
          if(task._id === action.task._id) newState.push(action.task);
          else newState.push(task);
        return newState;
      case "delete": 
        for(const task of state)
          if(task._id !== action._id) newState.push(task);
        return newState;
      default: return state;
    }
  }
  const [tasks, dispatch] = React.useReducer(reducer, []);
  const [modalProps, setModalProps] = React.useState({
    open : false,
    task : {
      _id : null,
      name :  "",
      completed : null,
    }
  });

  React.useEffect(async()=>{
    try{
      const res = await fetch('/api/v1/tasks');
      const data = await res.json();
      dispatch({type : "initialize", tasks : data.tasks});
    }
    catch(err){
      console.error(err)
    }
  }, []);


  function closeModal()
  {
    setModalProps(modalProps=>({...modalProps, open:false}))
  }
  function openModal(task)
  {
    setModalProps(()=>({task : task, open : true}))
  }

  async function handleAdd(name){
    try{
      const res = await fetch('/api/v1/tasks',{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({name})
      });
      const data = await res.json();
      if(!data.task) throw Error(data);
      dispatch({type:"add", task : data.task});
    }catch(err){
      console.error(err)
    }
  }

  async function handleDelete(_id){
    try{
      const res = await fetch(`/api/v1/tasks/${_id}`,{
        method : "DELETE",
      });
      const data = await res.json();
      dispatch({type:"delete", _id });
    }catch(err){
      console.error(err)
    }
  }

  async function handleUpdate(task){
    try{
      const res = await fetch(`/api/v1/tasks/${task._id}`,{
        method : "PATCH",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(task)
      });
      const data = await res.json();
      if(!data.task) throw Error(data);
      dispatch({type:"update", task : data.task });
    }catch(err){
      console.error(err)
    }
  }


  return (
    <AppContext.Provider value={{tasks,handleAdd,handleDelete,handleUpdate,closeModal,openModal,modalProps}}>
      <div 
        className="
          h-screen w-screen bg-slate-500 p-2
          flex flex-col items-center justify-around
        "
      >
        <Tasks/>
        <AddInput/>
        <UpdateModal/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
export {AppContext};