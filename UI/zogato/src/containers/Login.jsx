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
    height: 500,
}
class MyApp extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            class:'',
            roll_no:'',
            password:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (e)=>{
            axios.post('http://127.0.0.1:8000/signin',{
            'roll_no':this.state.roll_no,
            'pwd':this.state.password,
            'class':this.state.class
        },{
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    }}
                )
                .then((res) =>{
                    console.log(res);
                    this.props.history.push({pathname: '/marksform',state:{...res.data}});
                    localStorage.setItem('roll_no', res.data['roll_no']);
                    localStorage.setItem('name', res.data['name']);
                }).catch(error =>{
                    console.log(error);
                });

        }
render()
{
    console.log(this.state)
    return(
        <div>
            {/* <Header/> */}
            <div className="register_container" style = {style}>
                <h4>Signin</h4>
                <form  noValidate autoComplete="off">
                    <div>  
                        <a href="/register" style={{textDecoration:"none", coloe:"white"}}>
                           
                        <Button variant="contained" color="secondary" style={{ marginBottom:10}}>
                            New User
                        </Button>  
                        </a>
                        <br/> 
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
                        <br/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Password"
                            type="password"
                            variant="outlined"
                            onChange = {(e)=>this.setState({...this.state,password:e.target.value})}
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