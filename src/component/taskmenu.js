import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
function Taskmenu() {
    const [data,setData]=useState({})
    const{getdata}=useSelector((state)=>state.data)
    console.log('getdata',getdata);
  
    console.log(data);
    const dispatch=useDispatch()
    const Getauth=()=>{
        axios.post('https://stage.api.sloovi.com/login?product=outreach',{
        email : "vopevo7737@vpsrec.com",
        password : "12345678"
      }
      ).then((res)=>{
        console.log('res',res)
        dispatch({type:'Getdetails',payload:res.data})
      }).catch((e)=>{
        console.log('error',e);
      })
      
    }
  
    const Getusers=()=>{
        axios.get(`https://stage.api.sloovi.com/team?product=outreach&company_id=${getdata.result.company_id}`).then((res)=>{
        console.log('res users',res)
        dispatch({type:'Getdetails',payload:res.data})
      }).catch((e)=>{
        console.log('error',e);
      })
      
    }
    // if(data.company_id!=''){
    //     Getusers()
    // }
    useEffect(() => {
      Getauth()
      
    }, [])
    useEffect(() => {
setData(getdata)
      
    }, [getdata])
    

    
  return (
    <div>
       hii
    </div>
  )
}

export default Taskmenu