import React from 'react'
import {AppContext} from '../App'
export default function AddInput() {
    const {handleAdd} = React.useContext(AppContext);
    const [val, setVal] = React.useState('');
    return (
        <div 
            className='
                w-11/12  
                bg-slate-100 p-2
                shadow-md shadow-slate-800 
                rounded-lg box-border
                flex justify-center items-center
            '
        >
            <input 
                placeholder='Eg. Practice on Leetcode'
                className='
                flex-1 bg-slate-100 focus:outline-none
                text-slate-900  text-lg 
                ' 
                value={val}
                onChange={ev => setVal(ev.target.value)}
            /> 
            <button className='
                w-200 p-2 mx-3 bg-slate-500 text-white
                rounded shadow-sm shadow-slate-900 active:shadow-inner 
                '
                onClick={()=>val.length && handleAdd(val) && setVal("")}
            >Add</button>
        </div>
    )
}
