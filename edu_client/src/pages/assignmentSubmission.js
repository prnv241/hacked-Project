import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Button from "@material-ui/core/Button";
import JumboTitle from "../components/JumboTitle";
import { connect } from "react-redux";
import { getAssgn } from "../redux/actions/assgnActions";
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

function createData(name, rollNo, date, file, marks) {
  return { name, rollNo, date, file, marks };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, "file", 24),
  createData("Ice cream sandwich", 237, 9.0, "file", 37),
  createData("Eclair", 262, 16.0, "file", 24),
  createData("Cupcake", 305, 37, "file", 67),
  createData("Gingerbread", 356, 16.0, "file", 49),
];

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

const csv = objectsToCSV(rows);
console.log("csv", csv);

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

// const mapStateToProps = (state) => ({
//   assignments: state.assignments,
// });

// const mapDispatchToProps = {
//   getAssgn,
// };

export class AssignmentSubmission extends Component {
  //   componentDidMount() {
  //     this.props.getAssgn(this.props.match.params.assgnId);
  //   }
  render() {
    // const {
    //   assignment,
    //   loading: { ploading },
    // } = this.props.assignments;

    // let chaptersMarkup = !ploading ? (
    //   <>
    //     <JumboTitle title={assignment.metadata.lessonName} />
    //     {assignment.chapters.map((chap) => {
    //       console.log(chap);
    //       return <ChapterSlide key={chap.chapNo} chap={chap} />;
    //     })}
    //     {assignment.chapters.map((chap) => {
    //       console.log(chap);
    //       return <ChapterSlide key={chap.chapNo} chap={chap} />;
    //     })}
    //   </>
    // ) : (
    //   <Loading />
    // );

    return (
      <>
        <Navbar />
        <JumboTitle title={"Assignment Name"} />
        <div
          style={{
            margin: "2rem",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button onClick={() => download("file.csv", csv)} variant="contained">
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
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.rollNo}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained">Download</Button>
                    </TableCell>
                    <TableCell align="right">
                      <TextField id="standard-basic" label="Marks" />
                    </TableCell>
                    <TableCell align="right">
                      <Button style={{ color: "green" }} variant="outlined">
                        Done
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
}

export default AssignmentSubmission;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AssignmentSubmission);
