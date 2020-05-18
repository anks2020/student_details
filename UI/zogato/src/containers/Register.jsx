import React, {Component} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
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
    height: 550,
}
class MyApp extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            fname:'',
            lname:'',
            class:'',
            roll_no:'',
            password:'',
            c_pwd:'',
        }
        this.matchPassword = this.matchPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // function to match passwords
    matchPassword =(e) =>{
        if(e.target.value!==this.state.password)
        alert("Password  Mismatch")
        e.target.value="";
    }
    handleSubmit = (e)=>{
        if(this.state.c_pwd!==this.state.password)
        {
            e.preventDefault();
        }
        else{
            axios.post('http://127.0.0.1:8000/adduser',{
            'roll_no':this.state.roll_no,
            'fname':this.state.fname,
            'lname':this.state.lname,
            'class':this.state.class,
            'pwd':this.state.password
        },{
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    }}
                )
                .then((res) =>{
                    console.log(res);
                    this.props.history.push({pathname: '/signin'});
                }).catch(error =>{
                    console.log(error);
                });
        }
        
    }
render()
{
    console.log(this.state)
    return(
        <div>
            {/* <Header/> */}
            <div className="register_container" style = {style}>
                <h4>Register Yourself</h4>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField
                            className="inputtext"
                            required
                            id="outlined-required"
                            label="FirstName"
                            variant="outlined"
                            style={{marginBottom:16}}
                            onChange = {(e)=>this.setState({...this.state,'fname':e.target.value})}
                        />
                        <br/>
                        <TextField
                            required
                            className="inputtext"
                            id="outlined-required"
                            label="LastName"
                            variant="outlined"
                            style={{marginBottom:16}}
                            onChange = {(e)=>this.setState({...this.state,'lname':e.target.value})}
                        />  
                        <br />                     
                        <TextField
                            required
                            id="outlined-required"
                            label="Roll Number"
                            variant="outlined"
                            onChange = {(e)=>this.setState({...this.state,roll_no:e.target.value})}
                        />
                        <br/>
                        <SelectField 
                        values = {[11,12]}
                        label="Class"
                        labels = {["XIth","XIIth"]}
                        value = {this.state.class} 
                        onChange = {(e)=>this.setState({...this.state,class:e.target.value})}/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Password"
                            type="password"
                            variant="outlined"
                            style={{marginBottom:16}}
                            onChange = {(e)=>this.setState({...this.state,password:e.target.value})}
                        />
                        <br/>
                        <TextField
                            required
                            id="outlined-required"
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            onChange = {(e)=>this.setState({...this.state,c_pwd:e.target.value})}
                            onBlur = {(e)=>this.matchPassword(e)}
                        />
                        <br/>
                        <br/>
                        <Button variant="contained" color="primary" onClick= {(e)=>this.handleSubmit(e)}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
}

export default MyApp;