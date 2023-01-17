import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {Button, Select,Form,TimePicker,DatePicker} from  'antd'
import { DeleteOutlined, ProfileOutlined } from '@ant-design/icons';
import Arrayval from '../Reusecomponent/Arrayval'
import Timetosec from '../Reusecomponent/Timetosec';
import Currenttimetosec from '../Reusecomponent/Currenttimetosec';
function Taskmenu1() {
    const dispatch=useDispatch()
    const{getdata}=useSelector((state)=>state.data)
    const{Addtask}=useSelector((state)=>state.data)
    const onFinish = (values) => {
        var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let submitdata={"assigned_user":values.assigned_user,"task_date":values.task_date.format('YYYY-MM-DD'),'is_completed':1,"task_time":Timetosec(values.task_time),'time_zone':Currenttimetosec(time),"task_msg":"test task"}
        if(getdata){
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + `${getdata.results?.token}`
                }
              }
            axios.put(`https://stage.api.sloovi.com/task/lead_745cdc05ef6a43f7985e408c85a4fef1/<task_id>?company_id=${getdata.results?.company_id}`,submitdata,config).then((res)=>{
                console.log('add user',res)
                // setUserdet(res.data)
                
                dispatch({type:'Addtask',payload:res.data})
    
              }).catch((e)=>{
                console.log('error',e);
              })
        }
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    const deletedata=async()=>{
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + `${getdata.results.token}`
            }
          }
       await axios.delete(`https://stage.api.sloovi.com/task/lead_745cdc05ef6a43f7985e408c85a4fef1/<task_id>?company_id=${getdata.results.company_id}`,config).then((res)=>{
            console.log('res users',res)
            
            dispatch({type:'Deletetask',payload:res.data})
          }).catch((e)=>{
            console.log('error',e);
          })
        dispatch({type:'Addtask',payload:[]})
    
     }

     const oncancelhandle=()=>{
        // setSaveview(false)
        // setEditview(false)
     }
  return (
    <div>
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
     defaultValue={Addtask.results?.task_date}
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
            defaultValue={Addtask.results?.task_time}
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
        defaultValue={Addtask.results?.assigned_user}
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
    </div>
  )
}

export default Taskmenu1