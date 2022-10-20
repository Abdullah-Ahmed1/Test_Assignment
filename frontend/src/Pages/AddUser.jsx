import Paper from "@mui/material/Paper";
import * as React from 'react'
import axios from 'axios';
import {useLocation,useNavigate} from 'react-router-dom'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  


const  AddUser = ()=>{
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail]= useState("");
    const [cell,setCell] =useState("")
    const [age,setAge] = useState("")
//----------------------------------------------------------------
    const [nameError,setNameError] = useState(false)
    const [nameErrorText,setNameErrorText] = useState("")
    const [emailError,setEmailError] = useState(false)
    const [emailErrorText,setEmailErrorText] = useState("")
    const [ageError,setAgeError] = useState(false)
    const [ageErrorText,setAgeErrorText] = useState("")
    
//----------------------------------------------------------------
    const [resMsg,setResMsg] = useState(null)
    const [snackOpen,setSnackOpen] = useState(false)
    const handleSnackClose = ()=>{
        setSnackOpen(false)
    }

    
    let location = useLocation();
    console.log(location)

    const handleSubmit= ()=>{
        console.log(typeof(age))
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;  
        if(name===""){
            setNameError(true)
            setNameErrorText("Name is required")
        }
        else if(email===""  ){
            setEmailError(true)
            setEmailErrorText("email is required")
           
        }else if(!emailRegex.test(email)){
            setEmailError(true)
            setEmailErrorText("email is pattern is not correct")
        }else if(!/^(1[89]|[2-5][0-9]|6[0-0])$/.test(age)){
            console.log("reached-------")
            setAgeError(true)
            setAgeErrorText("Age range should be between 18-60")
        }
        else{
            const data = {
                name: name,
                email: email,
                cell: cell,
                age: age
            }
            axios.post("http://127.0.0.1:8081/add",data)
            .then(res=>{
                console.log(res.status)
                setResMsg({msg: "User Added successfully",status: "success"})
                setSnackOpen(true)
                setTimeout(()=>{
                    navigate("/")},2000)
                
            }).catch(err=>{
                console.log(err.response.data.message)
                setResMsg({msg: err.response.data.message,status:"error"})
                setSnackOpen(true)
            })
        }

    }


    return(
        <>
        {
            resMsg? (
                <Snackbar open={snackOpen} autoHideDuration={6000}   key={"top" + "right"}  anchorOrigin={{ vertical:"top", horizontal:"right" }}  onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={resMsg.status} sx={{ width: '100%' }}>
                  {resMsg? resMsg.msg: "this is dummy"}
                </Alert>
              </Snackbar>
            ):
            (
                null
            )
        }
        <Paper sx={{width:"80%",padding:"50px 0px",display:"flex", flexDirection:"column",alignItems:"center"}}>
            <TextField  
                value={name} 
                onChange={(e)=>setName(e.target.value) }    
                sx = {{width:"50%",marginBottom:"10px"}}
                id="outlined-basic"
                label="Name"
                variant="outlined" required 
                error={nameError}
                helperText={nameError? nameErrorText: ""}
                 
            />
            <TextField 
                value={email} 
                onChange={(e)=>setEmail(e.target.value) } 
                sx = {{width:"50%",marginBottom:"10px"}} 
                id="outlined-basic" 
                label="Email"   
                variant="outlined" 
                required 
                error={emailError}
                helperText={emailError? emailErrorText: ""}
            />
            <TextField 
                value={cell} 
                onChange={(e)=>setCell(e.target.value) } 
                sx = {{width:"50%",marginBottom:"10px"}} 
                id="outlined-basic" 
                label="Cell No"   
                variant="outlined" 
                required
            />
            <TextField 
                value={age} 
                onChange={(e)=>setAge(e.target.value) }  
                sx = {{width:"50%",marginBottom:"10px"}}  
                type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  
                required   
                id="outlined-basic" 
                label="Age"   
                variant="outlined"
                error={ageError}
                helperText={ageError? ageErrorText: ""} 
            />
            
            <Button  onClick={handleSubmit}  variant="contained">Add</Button>
        </Paper>
        </>
    )
}
export default AddUser