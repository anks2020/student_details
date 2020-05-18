import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormPropsTextFields from './TextField';

export default function RadioButtonsGroup(props) {
  const [value, setValue] = React.useState('female');


  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="subject" name="subject" value={value} onChange={props.onchange}>
        <FormControlLabel value={props.values[0]}control={<Radio />} label={props.subjects[0]} />
        <FormControlLabel value={props.values[1]} control={<Radio />} label={props.subjects[1]} />
        
      </RadioGroup>
    </FormControl>
  );
}
