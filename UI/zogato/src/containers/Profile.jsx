import React, {Component} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import SelectField from '../components/Inputs/Select';
// import Header from '../components/Headers/Header';
import '../App.css';
const style = {
    background: "#f0ff7f3d",
    padding: 16,
    top: 40,
    display:"inline-block",
    position: "relative",
    width: 606,
    height: 500,
}
class MyApp extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            fname:'',
            lname:'',
            standard:'',
            roll_no:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount = ()=>{
       console.log(localStorage.getItem('roll_no'))
       console.log(window.localStorage.length)
       if(localStorage.getItem('roll_no') != null)
      {
           axios.get("http://127.0.0.1:8000/getuser/"+localStorage.getItem('roll_no'))
        .then((res)=>{
          console.log(res);
          let data = res.data;
          this.setState({
              fname:data[0]['fname'],
              lname:data[0]['lname'],
              roll_no:data[0]['roll_no'],
              standard:data[0]['class']
          })
        });
      }
      else
      {
          this.props.history.push("/signin")
      }
       
    }
    handleSubmit = (e)=>{
        if(this.state.c_pwd!==this.state.password)
        {
            e.preventDefault();
        }
        else{
            axios.post('http://127.0.0.1:8000/updateuser',{
            'roll_no':localStorage.getItem('roll_no'),
            'fname':this.state.fname,
            'lname':this.state.lname,
            'class':this.state.standard,
        },{
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    }}
                )
                .then((res) =>{
                    console.log(res);
                    this.props.history.push({pathname: '/dashboard'});
                }).catch(error =>{
                    console.log(error);
                });
        }
        
    }
    handleDelete = () =>{
        axios.post('http://127.0.0.1:8000/deleteuser',
        {'roll_no':this.state.roll_no},
        {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                }}
            ) .then((res) =>{
                console.log(res);
                localStorage.clear();
                this.props.history.push({pathname: '/dashboard'});
            }).catch(error =>{
                console.log(error);
            });
    }
render()
{
    console.log(this.state)
    return(
        <div>
            <div className="register_container" style = {style}>
                <h4>Profile Details<DeleteIcon style={{float:"right"}} onClick={(e)=>this.handleDelete()} /></h4>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            value={this.state.fname}
                            label="FirstName"
                            variant="outlined"
                            onChange = {(e)=>this.setState({...this.state,'fname':e.target.value})}
                            style={{marginBottom:16}}
                        />
                        
                        <br/>
                        <TextField
                            required
                            style={{marginBottom:16}}
                            id="outlined-required"
                            label="LastName"
                            value={this.state.lname}
                            variant="outlined"
                            onChange = {(e)=>this.setState({...this.state,'lname':e.target.value})}
                        />  
                        <br />                     
                        <TextField
                            required
                            style={{marginBottom:16}}
                            id="outlined-required"
                            label="Roll Number"
                            value={this.state.roll_no}
                            variant="outlined"
                            disabled={true}
                            onChange = {(e)=>this.setState({...this.state,roll_no:e.target.value})}
                        />
                        <br/>
                        <SelectField 
                        values = {[11,12]}
                        label="Class"
                        labels = {["XIth","XIIth"]}
                        value = {this.state.standard} 
                        onChange = {(e)=>this.setState({...this.state,standard:e.target.value})}/>
                        <br/>
                        <div style={{display:"inline-flex"}}>
                            <Button variant="contained"  style={{marginRight:50}}color="primary" onClick= {(e)=>this.handleSubmit()}>
                                Submit
                            </Button>
                            <a href = "/dashboard" style={{textDecoration:"none"}}>
                                <Button variant="contained" color="secondary" >
                                    Cancel
                                </Button>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
}


export default MyApp;