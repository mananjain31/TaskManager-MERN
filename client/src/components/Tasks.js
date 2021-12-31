import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {AppContext} from '../App'

export default function Tasks() {
    const {tasks, handleDelete, openModal} = React.useContext(AppContext);
    
    console.log(tasks)
    return (
        <div 
            className='
                flex-1 m-2 w-11/12  bg-slate-100 p-2
                shadow-md shadow-slate-800 
                rounded-lg box-border flex-col
                flex items-center overflow-x-hidden overflow-y-auto
            '
        >
        {
            tasks.map(
                task=>(
                    <div
                        key={task._id}
                        className='
                            flex w-full bg-slate-500 p-2 m-1
                            rounded text-white 
                        '
                    >
                        <div
                            className={`
                                flex-1 mx-1 text-lg ${task ? task.completed ? "line-through" : "" : ""}
                            `}
                        >{task.name}</div>
                        <div
                            className='
                                mx-1 flex justify-around 
                                items-center
                            '
                        >
                            <div 
                                className='px-2 text-white hover:text-blue-200 active:text-blue-500 cursor-pointer '
                                onClick={()=>openModal(task)}
                            >
                                <FontAwesomeIcon icon={faPencilAlt} color='inherit'/>
                            </div>
                            <div 
                                className='px-2 text-white hover:text-red-200 active:text-red-500 cursor-pointer '
                                onClick={()=>handleDelete(task._id)}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} color='inherit'/>
                            </div>
                        </div>
                    </div>
                )
            )
        }
        </div>
    )
}
