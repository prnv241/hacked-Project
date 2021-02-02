import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Button from "@material-ui/core/Button";
import JumboTitle from "../components/JumboTitle";
import { connect } from "react-redux";
import { getAssgn } from "../redux/actions/assgnActions";
import ChapterSlide from "../components/ChapterSlide";
import Loading from "../components/Loading";
import "./writtenAssignment.css";

const mapStateToProps = (state) => ({
  assignments: state.assignments,
});

const mapDispatchToProps = {
  getAssgn,
};

export class WrittenAssignment extends Component {
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
        <JumboTitle title={"Assignment Name"} />
        <div className="whole">
          <div>Marks :</div>
          <div> 10 </div>
          <div></div>
          <div>Deadline :</div>
          <div>Date to be added</div>
        </div>
        <div className="description">
          <div style={{ fontWeight: "bold" }}>Description</div>
          <div style={{ marginTop: "1rem" }}>To be added description</div>
        </div>
        <div className="submit">
          <Button variant="contained">Upload</Button>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrittenAssignment);
