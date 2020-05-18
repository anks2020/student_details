import React, {Component} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Radio from '../components/Inputs/Radio';
import SelectField from '../components/Inputs/Select';
import Header from '../components/Headers/Header';
import '../App.css';
const style = {
    background: "#ffdf7f29",
    padding: 16,
    top: 40,
    display:"inline-block",
    position: "relative",
    width: 606,
    height: 345,
}
class MyApp extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            physics:'',
            chem:'',
            maths:'',
            bio:'',
            selected:'',
        }
        this.handlechange = this.handlechange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    selectSubject = (e) =>{
        this.setState({...this.state,selected:e.target.value})
    }
    handlechange = (e) =>{
        console.log(this.state.selected, "SELECTED")
        this.setState({
            ...this.state,
            [this.state.selected]:e.target.value
        })
    }
    handleSubmit=( event ) =>{
        event.preventDefault();
        console.log([this.state.selected],this.state[this.state.selected] )
        axios.post('http://127.0.0.1:8000/marks',{
            'roll_no':this.props.location.state.roll_no,
            'physics':this.state.physics,
            'chem':this.state.chem,
            [this.state.selected]:this.state[this.state.selected]
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
        console.log(this.state);
      }
    render()
    {
        return(
            <div>

                <div className="marks_container" style = {style}>
                    <h4>Enter your marks</h4>
                    <form  noValidate autoComplete="off" encType="multipart/form-data">
                        <div>
                            <label style={{marginRight:"25px"}}>Physics</label>
                            <TextField
                                className="inputtext"
                                required
                                // id="outlined-required"
                                // label="Physics"
                                variant="outlined"
                                onChange = {(e)=>this.setState({...this.state,'physics':e.target.value})}
                                style={{marginBottom: "10px"}}
                            />
                            <br/>
                            <label style={{marginRight:"7px"}}>Chemistry</label>
                            <TextField
                                required
                                className="inputtext"
                                // id="outlined-required"
                                // label="LastName"
                                variant="outlined"
                                onChange = {(e)=>this.setState({...this.state,'chem':e.target.value})}
                                style={{marginBottom: "10px"}}
                            />                       
                            <br/>
                            <div style={{display:"inline-flex"}}>
                                <div style={{marginRight:"84px", float:"left"}}>
                                    <SelectField 
                                    values = {["maths","bio"]}
                                    label="Maths/Bio"
                                    labels = {["Mathematics","Biology"]}
                                    value = {this.state.selected} 
                                    onChange = {(e)=>this.selectSubject(e)}
                                    />
                                </div>
                            <TextField
                                required
                                className="inputtext"
                                variant="outlined"
                                onChange = {(e)=>this.handlechange(e)}
                                style={{left:"-80px", float:"right"}}
                                disabled={this.state.selected==''}
                            />   
                            </div>
                            
                            <br/>
                            <Button variant="contained" color="primary" onClick={(e)=>this.handleSubmit(e)}>
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