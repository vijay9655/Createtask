import React from 'react'
import axios from 'axios'
var initial={
    getdata:[],
    userdetail:[],
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
        case 'Getuserdet':
            return{
                ...state,userdetail:action.payload
            }
        case 'Addtask':
            return{
                ...state,Addtask:action.payload
            }
        case 'Updatetask':
            return{
                state,updatetask:action.payload
            }
        case 'Deletetask':
            return{
                state,deletetask:action.payload
            }
        default:
            return state
            
            }
            
            

    }




export default reducer;