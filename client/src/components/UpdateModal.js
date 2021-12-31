import React from 'react'
import {AppContext} from '../App';
export default function UpdateModal() {
    const {closeModal, modalProps, handleUpdate, handleDelete} = React.useContext(AppContext);
    const [task, setTask] = React.useState({
        _id : null, name : "", completed : false
    });

    React.useEffect(()=>{
        setTask(modalProps.task);
    }, [modalProps]);

    return (
        <div
            className={`
                absolute top-0 bottom-0 right-0 left-0 
                bg-black bg-opacity-50 flex justify-center items-center
                ${modalProps.open ? "" : "hidden"}
            `}
        >
            <div
                className='
                    bg-slate-100 h-fit p-3 rounded-2xl shadow-xl
                '
            >
                <h3
                    className='
                        color-black
                        text-3xl text-center
                    '
                >Update Task</h3>
                <div className='mt-5 flex items-center justify-around'>
                    <label
                        className='text-xl select-none'
                        htmlFor='uinp'
                    >Name  
                    <input 
                        type='text' id='uinp' placeholder='Eg. Practice on Leetcode'
                        value={task.name}
                        onChange={(ev)=>setTask(task=>({...task, name:ev.target.value}))}
                        className='
                        bg-slate-100 border-2 border-slate-600 focus:outline-none p-1 rounded-lg 
                        text-md text-slate-600 mx-2 
                        '
                    />
                    </label>
                </div>
                <div
                    className='flex items-center mt-4'
                >
                    <label htmlFor='ucb'
                        className='text-xl select-none'
                    >Completed</label>
                    <div
                        className='flex justify-around items-center flex-1
                        text-slate-600'
                    >
                        <input 
                            checked={task.completed} 
                            onChange={()=>setTask(task=>({...task, completed : !task.completed}))} 
                            type="checkbox" id='ucb' 
                            className='w-5 h-5 rounded accent-slate-600'/>
                    </div>
                </div>
                <div
                    className='
                        flex justify-end items-center mt-5
                    '
                >
                    <button
                        onClick={()=>handleUpdate(task) && closeModal()}                        
                        className='ml-1 bg-slate-600 hover:bg-slate-400 
                        hover:border-black hover:border-2
                        border-slate-600 border-2
                        ease-in duration-200 text-white p-2 rounded'
                    >Update</button>
                    
                    <button
                        onClick={()=>handleDelete(task._id) && closeModal()}                        
                        className='ml-1 bg-red-600 hover:bg-red-400
                        text-white p-2 rounded 
                        hover:border-black hover:border-2
                        border-red-600 border-2
                        ease-in duration-200'
                    >Delete</button>
                    <button
                        onClick={closeModal}                        
                        className='ml-1 border-2 
                        border-slate-600 text-slate-600 hover:bg-slate-200
                        p-2 rounded ease-in duration-200'
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}
