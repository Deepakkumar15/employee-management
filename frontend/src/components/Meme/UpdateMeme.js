import React, { useState } from 'react';
import  { Redirect, useParams } from 'react-router-dom' ;
import Input from '../Input/Input';
import Button from '../Button/Button';
import './NewMeme.css';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const UpdateEmployee = props => {
  const { id }  = useParams() ;
  const history = useHistory();

  const [enteredName, setEnteredName] = useState("");
  const [enteredSalary, setEnteredSalary] = useState("");
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredTeam, setEnteredTeam] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const salaryChangeHandler = (event) => {
    setEnteredSalary(event.target.value);
  };

  const genderChangeHandler = (event) => {
    setEnteredGender(event.target.value);
  };

  const teamChangeHandler = (event) => {
    setEnteredTeam(event.target.value);
  };
  const addressChangeHandler = (event) => {
    setEnteredAddress(event.target.value);
  };

  const updateEmployeeHandler = async (event) => {
    event.preventDefault();
    if (
      !enteredName ||
      enteredName.length === 0 ||
      !enteredGender ||
      enteredGender.length === 0 ||
      !enteredTeam ||
      enteredTeam.length === 0 ||
      !enteredSalary ||
      enteredSalary.length === 0 ||
      !enteredAddress ||
      enteredAddress.length === 0
    ) {
      alert("Enter correct details!");
    } else {
      let hasError = await props.onUpdateEmployee(
        enteredName,
        enteredSalary,
        enteredGender,
        enteredTeam,
        enteredAddress,
        id);
      if(!hasError){
        history.push("/");
      }
    }
  };
    

  return (
    <section id="new-meme">
      <h2>Update Employee Details</h2>
      <form onSubmit={updateEmployeeHandler}>
        <Input
          type="text"
          label="Employee Name"
          id="name"
          // Placeholder="Enter your full name"
          value={enteredName}
          onChange={nameChangeHandler}
        />
        <Input
          type="text"
          label="Salary"
          id="salary"
          // Placeholder="Be creative with the caption"
          value={enteredSalary}
          onChange={salaryChangeHandler}
        />

        <Container>
          <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={enteredGender}
                  onChange={genderChangeHandler}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={3}>
              <FormControl className={useStyles.formControl}>
                <InputLabel id="label">Team</InputLabel>
                <Select value={enteredTeam} onChange={teamChangeHandler}>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Development">Development</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>

        <Input
          type="text"
          label="Address"
          id="address"
          // Placeholder="Enter URL of your meme here"
          value={enteredAddress}
          onChange={addressChangeHandler}
        />
        <Button type="submit">Update Employee Details</Button>
      </form>
    </section>
  );
};

export default UpdateEmployee;
