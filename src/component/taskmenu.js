import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {Button, Select,Form,TimePicker,DatePicker} from  'antd'
import { DeleteOutlined, EditOutlined, ProfileOutlined } from '@ant-design/icons';
import Arrayval from '../Reusecomponent/Arrayval'
import Timetosec from '../Reusecomponent/Timetosec';
import Currenttimetosec from '../Reusecomponent/Currenttimetosec';
import Taskmenu1 from './taskmenu1';

function Taskmenu() {
    const [data,setData]=useState()
    const [userdet,setUserdet]=useState()
    const [getalltask,setGetalltask]=useState()
    const [saveview,setSaveview]=useState(false)
    const [editview,setEditview]=useState(false)
    const [updateview,setUpdateview]=useState(false)
   
    const dispatch=useDispatch()
    const{Addtask}=useSelector((state)=>state.data)
    console.log(Addtask?.results)
    const Getauth=()=>{
      console.log('enter');
        axios.post('https://stage.api.sloovi.com/login?product=outreach',{
        email : "vopevo7737@vpsrec.com",
        password : "12345678"
      },{
        "Content-Type": "application/json"
       
      }
      ).then((res)=>{
        console.log('auth',res)

        setData(res.data)

        dispatch({type:'Getdetails',payload:res.data})
      }).catch((e)=>{
        console.log('error',e);
      })
      
    }
    const Getalltask=async()=>{
        if(data){
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + `${data.results.token}`
                }
              }
           await axios.get(`https://stage.api.sloovi.com/task/lead_745cdc05ef6a43f7985e408c85a4fef1?company_id=${data.results.company_id}`,config).then((res)=>{
                setGetalltask(res.data)
              }).catch((e)=>{
                console.log('error',e);
              })
        }
      
    }

 
    const Getusers=async()=>{
        if(data){
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + `${data.results.token}`
                }
              }
           await axios.get(`https://stage.api.sloovi.com/team?product=outreach&company_id=${data.results.company_id}`,config).then((res)=>{
                console.log('res users',res)
                setUserdet(res.data)
                dispatch({type:'Getuserdet',payload:res.data})
              }).catch((e)=>{
                console.log('error',e);
              })
        }
        
      
    }
    useEffect(() => {
      Getauth()
    }, [])
    useEffect(() => {
       
      Getusers()
      Getalltask()
    }, [data])
//     const deft={
//         modified: "2023-01-02T05:54:02.895863",
// modified_by: "user_d0e52aaa04c44b6199a18e8c811b23e2",
// name: "Martin Luthar",
// phone: "+91-9867456710",
// role_id: "role_f9340a3a9de74c7787f85284cdee9466",
// role_name: "Admin",
// status: 1,
// user_id: "user_d0e52aaa04c44b6199a18e8c811b23e2",
// user_status:"accepted"
//     }
// const v=Arrayval('user_id',deft)
//  console.log('arraval',v)
const onFinish = (values) => {
    var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let submitdata={"assigned_user":values.assigned_user,"task_date":values.task_date.format('YYYY-MM-DD'),'is_completed':1,"task_time":Timetosec(values.task_time),'time_zone':Currenttimetosec(time),"task_msg":"test task"}
    if(data){
        let config = {
            headers: {
              'Authorization': 'Bearer ' + `${data.results.token}`
            }
          }
        axios.post(`https://stage.api.sloovi.com/task/lead_745cdc05ef6a43f7985e408c85a4fef1?company_id=${data.results.company_id}`,submitdata,config).then((res)=>{
            console.log('add user',res)
            // setUserdet(res.data)
            setSaveview(false)
            setEditview(true)
            dispatch({type:'Addtask',payload:res.data})

          }).catch((e)=>{
            console.log('error',e);
          })
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
const onFinish1 = (values) => {
    var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let submitdata={"assigned_user":values.assigned_user,"task_date":values.task_date.format('YYYY-MM-DD'),'is_completed':1,"task_time":Timetosec(values.task_time),'time_zone':Currenttimetosec(time),"task_msg":"test task"}
    if(data){
        let config = {
            headers: {
              'Authorization': 'Bearer ' + `${data.results?.token}`
            }
          }
        axios.put(`https://stage.api.sloovi.com/task/lead_745cdc05ef6a43f7985e408c85a4fef1/<task_id>?company_id=${data.results?.company_id}`,submitdata,config).then((res)=>{
            console.log('update user',res)
            // setUserdet(res.data)
            setSaveview(false)
            setEditview(true)
            setUpdateview(false)
            dispatch({type:'Addtask',payload:res.data})

          }).catch((e)=>{
            console.log('error',e);
          })
    }
  };
  const onFinishFailed1 = (errorInfo) => {
    console.log('Failed1:', errorInfo);
  };

 const viewhandle=()=>{
    setSaveview(true)
    setEditview(false)
    setUpdateview(false)


 }
 const viewhandle1=()=>{
    setSaveview(false)
    setEditview(false)
    setUpdateview(true)

 }
 const oncancelhandle=()=>{
    setSaveview(false)
    setEditview(false)
 }
 const oncancelhandle1=()=>{
    setSaveview(false)
    setUpdateview(false)
    setEditview(true)
 }
 const deletedata=async()=>{
        console.log('delete');
    let config = {
        headers: {
          'Authorization': 'Bearer ' + `${data.results?.token}`
        }
      }
   await axios.delete(`https://stage.api.sloovi.com/task/lead_745cdc05ef6a43f7985e408c85a4fef1/<task_id>?company_id=${data.results?.company_id}`,config).then((res)=>{
        console.log('res users',res)
        setSaveview(false)
        setUpdateview(false)
        setEditview(false)
        dispatch({type:'Deletetask',payload:res.data})
      }).catch((e)=>{
        console.log('error',e);
      })
    dispatch({type:'Addtask',payload:[]})

 }
    
  return (
    <div>
      <MDBContainer style={{width:'30%',float:'left',height:'25px',}}>
        <MDBRow>
            <MDBCol size='11' className="mb-4" style={{border:'1px solid gray',textAlign:'start'}}>
                Task 1  
            </MDBCol>
            <MDBCol size='1' className="mb-4" style={{border:'1px solid gray',textAlign:'end',}}>

             <span style={{cursor:'pointer'}} onClick={viewhandle}>&#x2b;</span>
            </MDBCol>
           
        </MDBRow>
        </MDBContainer> <br/>
    <div>

   {saveview===true?
   <MDBContainer  style={{width:'30%',float:'left',border:'1px solid gray',background:'lightblue',textAlign:'start'}}>
   <MDBRow>
       <label>Task Descrription</label>
       <MDBCol size='12' className="mb-4" >
      <button  style={{cursor:'text',width:'100%',textAlign:'start',background:'white',border:'1px solid gray'}}>Follow Up<span style={{float:'right'}}>
<ProfileOutlined />
       </span></button>
       </MDBCol>
      
      
   </MDBRow>
   <Form
   initialValues={{
       remember: true,
     }}
     onFinish={onFinish}
     onFinishFailed={onFinishFailed}
     autoComplete="off"
   >
   <MDBRow>
  

       
       <MDBCol size='6' className="mb-4" >
       <label>Date</label><br/>
       <Form.Item
   
   name="task_date"
   rules={[
     {
       required: true,
       message: 'Please enter your task_date!',
     },
   ]}
 >

<DatePicker 
placement='topLeft'             style={{
           width: '100%',
         }}
       />
 </Form.Item>
      
       </MDBCol>
      
       <MDBCol size='6' className="mb-4" >
       <label>Time</label><br/>
       <Form.Item
   
   name="task_time"
   rules={[
     {
       required: true,
       message: 'Please select your task_time!',
     },
   ]}
 >
       <TimePicker
 use12Hours
 format="HH:mm"
 
 style={{
   width: '100%',

 }}
/></Form.Item>
       </MDBCol>
      
      
   </MDBRow>
   <MDBRow>
       <MDBCol size='md' className="mb-4" >
       <label>Assigned user</label><br/>
       <Form.Item
   
   name="assigned_user"
   rules={[
     {
       required: true,
       message: 'Please select your assign user!',
     },
   ]}
 >
       <Select
   
   
   defaultValue='sakthi'
//    defaultValue={{value:'vijay',label:'vijay'}}

   style={{
     width: '100%',
   }}
   options={[
       {
         value: 'vijay',
         label: 'vijay',
       },
       {
         value: 'sakthi',
         label: 'sakthi',
       }]}
 />
 </Form.Item>
       </MDBCol>
      
      
   </MDBRow>
   <MDBRow>
       <MDBCol>

       </MDBCol>
       <MDBCol size='6' className="mb-4" >
           <MDBRow>
               <MDBCol>
               <Button onClick={oncancelhandle}>cancel</Button>
               </MDBCol>
               <MDBCol>
               <Button htmlType='submit' style={{background:'green',color:'white'}}>Save</Button>
               </MDBCol>
           </MDBRow>
      
       
      
 
       </MDBCol>
      
      
   </MDBRow>
  
   </Form>

   </MDBContainer> 
   :
   editview===true?
<MDBContainer style={{width:'30%',float:'left',height:'25px',}}>
        <MDBRow style={{border:'1px solid gray',textAlign:'start'}}>
            <MDBCol size='2' className="mb-4" >
            <img width={50} src={Addtask.results?.assigned_user_icon} alt='img'/>
           


            </MDBCol>
            <MDBCol size='6' className="mb-4" style={{textAlign:'start'}}>
           
           <p>Follow Up</p>
           <p>{Addtask.results?.task_date}</p>

            </MDBCol>
            <MDBCol size='4' className="mb-4 mt-3" style={{textAlign:'center'}}>

             <span style={{cursor:'pointer'}} onClick={viewhandle1}><EditOutlined/></span>
            </MDBCol>
           
        </MDBRow>
        </MDBContainer>:updateview===true?
       
        <MDBContainer  style={{width:'30%',float:'left',border:'1px solid gray',background:'lightblue',textAlign:'start'}}>
        <MDBRow>
            <label>Task Description</label>
            <MDBCol size='12' className="mb-4" >
           <button  style={{cursor:'text',width:'100%',textAlign:'start',background:'white',border:'1px solid gray'}}>Follow Up<span style={{float:'right'}}>
     <ProfileOutlined />
            </span></button>
            </MDBCol>
           
           
        </MDBRow>
        <Form
        initialValues={{
            remember: true,
          }}
          onFinish={onFinish1}
          onFinishFailed={onFinishFailed1}
          autoComplete="off"
        >
        <MDBRow>
       
     
            
            <MDBCol size='6' className="mb-4" >
            <label>Date</label><br/>
            <Form.Item
        
        name="task_date"
        rules={[
          {
            required: true,
            message: 'Please enter your task_date!',
          },
        ]}
      >
     
     <DatePicker 
   
     placement='topLeft'             style={{
                width: '100%',
              }}
            />
      </Form.Item>
           
            </MDBCol>
           
            <MDBCol size='6' className="mb-4" >
            <label>Time</label><br/>
            <Form.Item
        
        name="task_time"
        rules={[
          {
            required: true,
            message: 'Please select your task_time!',
          },
        ]}
      >
            <TimePicker
            
      use12Hours
      format="HH:mm"
      
      style={{
        width: '100%',
     
      }}
     /></Form.Item>
            </MDBCol>
           
           
        </MDBRow>
        <MDBRow>
            <MDBCol size='md' className="mb-4" >
            <label>Assigned user</label><br/>
            <Form.Item
        
        name="assigned_user"
        rules={[
          {
            required: true,
            message: 'Please select your assign user!',
          },
        ]}
      >
            <Select
        // defaultValue={Addtask.results?.assigned_user}
        style={{
          width: '100%',
        }}
        options={[
            {
              value: 'vijay',
              label: 'vijay',
            },
            {
              value: 'sakthi',
              label: 'sakthi',
            }]}
      />
      </Form.Item>
            </MDBCol>
           
           
        </MDBRow>
        <MDBRow>
            <MDBCol>
            <DeleteOutlined onClick={deletedata} style={{cursor:'pointer'}} size={50}/>
            </MDBCol>
            <MDBCol size='6' className="mb-4" >
                <MDBRow>
                    <MDBCol>
                    <Button onClick={oncancelhandle1}>cancel</Button>
                    </MDBCol>
                    <MDBCol>
                    <Button htmlType='submit' style={{background:'green',color:'white'}}>Save</Button>
                    </MDBCol>
                </MDBRow>
           
            
           
      
            </MDBCol>
           
           
        </MDBRow>
       
        </Form>
     
        </MDBContainer> :
    
        null
}
      

        </div>
        
    </div>
  )
}

export default Taskmenu