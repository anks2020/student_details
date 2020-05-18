import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">{props.label}</InputLabel>
        <Select
          native
          value={props.value}
          onChange={props.onChange}
          label={props.label}
        //   inputProps={{
        //     name: 'class',
        //     // id: 'outlined-age-native-simple',
        //   }}
        >
          <option aria-label="None" value="" />
          <option value={props.values[0]}>{props.labels[0]}</option>
          <option value={props.values[1]}>{props.labels[1]}</option>
        </Select>
      </FormControl>
 
    </div>
  );
}
