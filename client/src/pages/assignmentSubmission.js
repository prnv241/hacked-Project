import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Button from "@material-ui/core/Button";
import JumboTitle from "../components/JumboTitle";
import { connect } from "react-redux";
import { getsubsubs, updateMarks } from "../redux/actions/assgnActions";
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
import SubRow from '../components/subRow';

// function createData(name, rollNo, date, file, marks) {
//   return { name, rollNo, date, file, marks };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, "file", 24),
//   createData("Ice cream sandwich", 237, 9.0, "file", 37),
//   createData("Eclair", 262, 16.0, "file", 24),
//   createData("Cupcake", 305, 37, "file", 67),
//   createData("Gingerbread", 356, 16.0, "file", 49),
// ];

function objectsToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr);
  return array
    .map((row) => {
      return Object.values(row)
        .map((value) => {
          return typeof value === "string" ? JSON.stringify(value) : value;
        })
        .toString();
    })
    .join("\n");
}

const download = (filename, text) => {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const mapStateToProps = (state) => ({
  assignments: state.assignments,
});

const mapDispatchToProps = {
  getsubsubs, updateMarks
};


export class AssignmentSubmission extends Component {
  state = {
    marks: "",
  }
  componentDidMount() {
    this.props.getsubsubs(this.props.match.params.id);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = () => {
    console.log(this.state.marks);
  }

  render() {
    const {
      subsubs,
      loading: { sloading },
    } = this.props.assignments;
    console.log(subsubs)
    let studMarkup = !sloading ? (
      <>
        <div
          style={{
            margin: "2rem",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button onClick={() => download("file.csv", objectsToCSV(subsubs))} variant="contained">
            Download
          </Button>
        </div>
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
                    Date of Submission
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Submitted File
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Marks
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Checked
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subsubs.map((row, index) => <SubRow key={index} ind={index} row={row} updateMarks={this.props.updateMarks} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    ) : (
        <Loading />
      );
    return (
      <>
        <Navbar />
        <JumboTitle title={"Assignment Name"} />
        {studMarkup}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentSubmission);
