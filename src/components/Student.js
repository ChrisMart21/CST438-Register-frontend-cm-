import React from "react";
import { Component } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Link } from 'react-router-dom';
import { SERVER_URL } from "../constants";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: "",
      studentEmail: "",
      studentStatusCode: 0
    };
  }

  addStudent = () => {
    const token = Cookies.get('XSRF-TOKEN');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': token
      },
      body: JSON.stringify({
        name: this.state.studentName,
        email: this.state.studentEmail,
        statusCode: this.state.studentStatusCode
      })
    };
    const url = `${SERVER_URL}student`;
    var err = false;
    fetch(url, requestOptions)
      .then(r => {
        if (!r.ok) {
          err = true
        }
        return r.json()
      })
      .then((r) => {
        console.log(r);
        if (err) {
          toast.error(r.message, {
            position: toast.POSITION.BOTTOM_LEFT
          });
        } else {
          toast.success("Student successfully added", {
            position: toast.POSITION.BOTTOM_LEFT
          });
        }
      })
  }
  render() {

    // }
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Student Services
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 20 }}>

          <TextField
            id="student_name"
            label="Student Name"
            value={this.state.studentName}
            onChange={(e) => this.setState({ studentName: e.target.value })}
          />
          <TextField
            id="student_email"
            label="Email"
            onChange={(e) => this.setState({ studentEmail: e.target.value })}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">StatusCode</InputLabel>
            <Select
              labelId="Student Status Code"
              id="studentStatusCode"
              value={this.state.studentStatusCode}
              label="StatusCode"
              onChange={(e) => this.setState({ studentStatusCode: e.target.value })}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField
            id="student_statusCode"
            label="Status Code"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) => this.setState({ studentStatusCode: e.target.value })}
          /> */}
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: 10 }}
            onClick={this.addStudent}>
            Add Student
          </Button>
        </div>
        <Grid container>
          <Grid item>
            {/* <ButtonGroup>
                  <AddCourse addCourse={this.addCourse}  />
				</ButtonGroup> */}
          </Grid>
        </Grid>
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
export default Student;