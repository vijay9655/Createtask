import React from 'react'
import axios from 'axios'
var initial={
    getdata:[],
    Addtask:[],
    updatetask:[],
    deletetask:[]
}

const reducer=(state=initial,action)=>{
    switch(action.type){
        case 'Getdetails':
            return{
                ...state,getdata:action.payload
            }
        case 'Addtask':
            return{
                ...state
            }
        case 'Updatetask':
            return{
                ...state
            }
        case 'Deletetask':
            return{
                ...state
            }
        default:
            return state
            
            }
            
            

    }




export default reducer;