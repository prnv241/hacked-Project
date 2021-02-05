import React, { Component } from 'react';
import ChapterSlide from "../components/ChapterSlide";
import Loading from "../components/Loading";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { updateMarks } from "../redux/actions/assgnActions";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Button, useScrollTrigger } from '@material-ui/core';

export class subRow extends Component {
    state = {
        marks: ""
    }
    componentDidMount() {
        this.setState({
            marks: this.props.row.marks
        })
    }
    handleSubmit = () => {
        console.log(this.props.row.userId, this.props.row.subId, this.state.marks);
        this.props.updateMarks(this.props.row.userId, this.props.row.subId, this.state.marks, this.props.ind);
    }
    render() {
        const { row } = this.props
        return (
            <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                    {row.studName}
                </TableCell>
                <TableCell align="right">{row.rollno}</TableCell>
                <TableCell align="right">{new Date().toDateString()}</TableCell>
                <TableCell align="right">
                    <a href={row.url}><Button variant="contained">Download</Button></a>
                </TableCell>
                <TableCell align="right">
                    <TextField id="standard-basic" label="Marks" name="marks" value={this.state.marks} onChange={(e) => this.setState({ marks: e.target.value })} />
                </TableCell>
                <TableCell align="right">
                    <Button style={{ color: "green" }} variant="outlined" onClick={this.handleSubmit}>
                        Done
                </Button>
                </TableCell>
            </TableRow>
        )
    }
}

export default subRow;

