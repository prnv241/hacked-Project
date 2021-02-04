import React, { Component } from "react";
import Navbar from "../components/Navbar";
import JumboTitle from "../components/JumboTitle";
import { connect } from "react-redux";
import { getAssgn } from "../redux/actions/assgnActions";
import ChapterSlide from "../components/ChapterSlide";
import Loading from "../components/Loading";

const mapStateToProps = (state) => ({
  assignments: state.assignments,
  user: state.user
});

const mapDispatchToProps = {
  getAssgn,
};

export class showAssign extends Component {
  componentDidMount() {
    this.props.getAssgn(this.props.match.params.assgnId);
  }
  render() {
    const {
      assignment,
      loading: { ploading },
    } = this.props.assignments;
    console.log(assignment);
    let chapId = this.props.match.params.assgnId ? this.props.match.params.assgnId : assignment.chapId;
    const qzs = { quiz: assignment.quizes, chapName: "Quizes", chapId: chapId };
    const subs = { submissions: assignment.submissions, chapName: "Submissions", chapId: chapId };
    let chaptersMarkup = !ploading ? (
      <>
        <JumboTitle title={assignment.metadata.lessonName} />
        <ChapterSlide chap={qzs} userid={this.props.user.id} />
        <ChapterSlide chap={subs} userid={this.props.user.id} />
      </>
    ) : (
        <Loading />
      );
    return (
      <>
        <Navbar />
        {chaptersMarkup}
        <p className="warning">(This is exactly same as lessons)</p>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(showAssign);
