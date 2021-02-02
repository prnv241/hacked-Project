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

function createData(name, rollNo, classs) {
  return { name, rollNo, classs };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 37),
  createData("Gingerbread", 356, 16.0),
];

const mapStateToProps = (state) => ({
  assignments: state.assignments,
});

const mapDispatchToProps = {
  getAssgn,
};

export class AnalysisList extends Component {
  //   componentDidMount() {
  //     this.props.getAssgn(this.props.match.params.assgnId);
  //   }
  render() {
    const {
      assignment,
      loading: { ploading },
    } = this.props.assignments;

    let chaptersMarkup = !ploading ? (
      <>
        <JumboTitle title={assignment.metadata.lessonName} />
        {assignment.chapters.map((chap) => {
          console.log(chap);
          return <ChapterSlide key={chap.chapNo} chap={chap} />;
        })}
        {assignment.chapters.map((chap) => {
          console.log(chap);
          return <ChapterSlide key={chap.chapNo} chap={chap} />;
        })}
      </>
    ) : (
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
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.rollNo}</TableCell>
                    <TableCell align="right">{row.classs}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained">Show</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisList);
