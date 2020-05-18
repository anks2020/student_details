import React,{Component} from 'react';
import Table from '../components/Table';
import axios from 'axios';

const columns = [
  { 
    id: 's_no',
   label: 'S.No', minWidth: "7px" },
  {id:'roll_no',label:'Roll No.', minWidth: 7},
  { id: 'name', label: 'Name', minWidth: 7 },
  {
    id: 'physics',
    label: 'Physics',
    minWidth:7,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    minWidth: 7,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'maths',
    label: 'Mathematics',
    minWidth: 7,
    align: 'right',
  },
  {
    id: 'bio',
    label: 'Biology',
    minWidth: 7,
    align: 'right',
  },
];

function createData(s_no,roll_no, name, physics, chemistry, maths, bio) {
  roll_no = roll_no.toUpperCase()
  return { s_no,roll_no, name, physics, chemistry, maths, bio};
}

class Result extends Component{
  constructor(props)
  {
    super(props)
    this.state = {
      rows:[]
    }
    this.search = this.search.bind(this);
  }
  search = (e) =>{
    let rows = [...this.state.rows]
    let newrows = []
    for(let j=0;j<rows.length;j++)
    {
      if((rows[j]['roll_no'].search(e.target.value)!=-1) || rows[j]['name'].search(e.target.value)!=-1)
      {
        newrows.push(rows[j])
      }
      console.log(rows[j])
      console.log(rows[j]['roll_no'])
      
      if(e.target.value=='')
      {
        return;
      }

    }
    this.setState({ rows:newrows})
  }
  createTableData = (data) =>{
    let r = []
    for(let i=0;i<data.length;i++)
    {
      r.push(createData(i+1,data[i].roll_no, data[i].name, data[i].physics,data[i].chem,data[i].maths,data[i].bio))
    }
    return r;
  }
  componentDidMount = () =>{
    axios.get("http://127.0.0.1:8000/getmarks")
    .then((res)=>{
      console.log(res.data);
      let data = res.data;
      var rows = []
      rows = this.createTableData(data);
        this.setState({ rows:rows})
    }
    )

  }
  render()
  {
    console.log(this.state)
    return(
      <div>
        <h4>RESULT</h4>
        <Table  search = {this.search} columns = {columns} rows = {this.state.rows}/>
      </div>
    )
  }
}
export default Result;