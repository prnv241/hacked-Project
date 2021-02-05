import React, { Component } from 'react'
import Navbar from "../components/Navbar";
import JumboTitle from '../components/JumboTitle';
import { connect } from 'react-redux';
import { getLesson } from '../redux/actions/lessonActions';
import ChapterSlide from '../components/ChapterSlide';
import Loading from '../components/Loading';

const mapStateToProps = (state) => ({
  lessons: state.lessons,
  user: state.user
})

const mapDispatchToProps = {
  getLesson,
}

export class showLesson extends Component {
  componentDidMount() {
    this.props.getLesson(this.props.match.params.lessonId);
  }
  render() {
    const { lesson, loading } = this.props.lessons;

    let chaptersMarkup = !loading ? (
      <>
        <JumboTitle title={lesson.metadata.lessonName} />
        {lesson.chapters.map((chap) =>
          <ChapterSlide key={chap.chapNo} chap={chap} userid={this.props.user.id} />
        )}
      </>
    ) : (
        <Loading />
      );
    return (
      <>
        <Navbar />
        {chaptersMarkup}
        <p className="warning">(Modules can be added to all chapters by clicking on Add icon)</p>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(showLesson)
