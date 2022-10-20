import * as React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import { useEffect,useState } from 'react';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

export default function Users() {
    const [rows,setRows] =useState(null)
    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    
    const [users,SetUsers] = useState([{
      _id: "1", 
      name: "All",
      email:"",
      cell: "",
      age:""
    }])
    
    const [value,setValue] =useState("All")
    
    const handleChange = (event)=>{
      setValue(event.target.value)

    }

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8081/get/${value}`)
        .then(res=>{
            console.log(res.data)
            setRows(res.data)
            
        })
    },[value])
    useEffect(()=>{
      axios.get(`http://127.0.0.1:8081/get/${value}`)
      .then(res=>{
          console.log(res.data)
          
          SetUsers([users[0],...res.data])
      })
    },[])

  return (
  <>
   <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Users</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={users.name}
          label="Users"
          onChange={handleChange}
          defaultValue={"All"}
        >
          {
            users? (
              users.map(user=>{
                return(
                  <MenuItem   key={user._id}  value = {user.name?? ""} >{user.name}  </MenuItem>
                )
              })
            ):(
              <div></div>
            )
          }
         
        </Select>
    
      </FormControl>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Cell No</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          rows? (
            rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.cell}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{new Date(row.createdAt).toDateString()}</TableCell>
                </TableRow>
              ))
          ):(
            null
          )  
        }
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

