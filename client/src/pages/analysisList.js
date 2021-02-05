import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Button from "@material-ui/core/Button";
import JumboTitle from "../components/JumboTitle";
import { connect } from "react-redux";
import { getStuds } from "../redux/actions/assgnActions";
import ChapterSlide from "../components/ChapterSlide";
import Loading from "../components/Loading";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const mapStateToProps = (state) => ({
  assignments: state.assignments,
});

const mapDispatchToProps = {
  getStuds,
};

export class AnalysisList extends Component {
  componentDidMount() {
    this.props.getStuds();
  }
  render() {
    const {
      studs,
      loading: { jloading },
    } = this.props.assignments;

    let studsMarkup = !jloading ? studs.map((row) => (
      <TableRow key={row.name}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.rollno}</TableCell>
        <TableCell align="right">A</TableCell>
        <TableCell align="right">
          <Button variant="contained" onClick={() => this.props.history.push(`/analysis/student/${row.id}`)}>Show</Button>
        </TableCell>
      </TableRow>
    )) : (
        <Loading />
      );

    return (
      <>
        <Navbar />
        <JumboTitle title={"Analysis"} />
        <div style={{ margin: "2rem" }}>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: "650" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Student Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Roll No.
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Class
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Analysis
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studsMarkup}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisList);
