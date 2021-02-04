import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Button } from '@material-ui/core';
import { submitQuiz } from '../redux/actions/lessonActions';
import { subAsgnQuiz } from '../redux/actions/assgnActions';
import { withRouter } from "react-router-dom"
import QuizCard from '../components/QuizCard';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  screen: {
    backgroundColor: '#f0f0f0',
    height: '84.5vh',
    weidth: '100vw'
  },
  upperbox: {
    backgroundColor: 'white',
    height: '20.5vh',
    weidth: '100vw'
  },
  chapname: {
    fontSize: '1rem',
    paddingTop: 30,
    paddingLeft: 60
  },
  quizname: {
    fontSize: '2rem',
    paddingLeft: 60
  },
  quizbox: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    overflowY: 'scroll',
    height: '60vh',
    weidth: '100vw'
  },
  timer: {
    float: 'right',
    paddingRight: 60
  }
}

export class QuizModule extends Component {
  state = {
    minutes: this.props.module.data.time,
    seconds: 0,
    started: false,
    quizAns: [],
  }

  setans = (id, ans) => {
    var ansobj = {
      id: id,
      ans: ans
    }
    var tempans = this.state.quizAns.filter((item) => item.id !== id)
    tempans.push(ansobj);
    this.setState({
      quizAns: tempans
    })
    console.log(this.state.quizAns);
  }
  startTimer = () => {
    this.setState({
      started: true
    })
    setInterval(() => {
      const { seconds, minutes } = this.state
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
          this.setState({
            started: null
          })
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000);
  }
  handleSubmit = () => {
    if (this.props.mode) {
      let asgnId = this.props.match.params.asgnId;
      var quizAns = this.state.quizAns;
      let ref = this.props.match.params.id;
      var form = {
        userId: this.props.user.id,
        studName: this.props.user.name,
        name: this.props.assignments.submission.name,
        rollno: this.props.user.rollno,
        quizId: ref
      }
      this.props.subAsgnQuiz(asgnId, ref, quizAns, form);
    } else {
      var quizAns = this.state.quizAns;
      let chapId = this.props.match.params.chapId;
      let ref = this.props.match.params.ref;
      this.props.submitQuiz(chapId, ref, quizAns);
    }
  }
  componentDidUpdate() {
    let ref = this.props.match.params.id;
    if (this.props.lessons.rloading === false || this.props.assignments.rloading === false) {
      var lnk = this.props.lessons.rloading === false ? `/module/quizes/${ref}/result` : `/assinments/quiz/${ref}/result`;
      this.props.history.push(lnk);
    }
  }
  render() {
    const { minutes, seconds, started } = this.state;
    const Rloading = this.props.lessons.rloading != null ? this.props.lessons.rloading : this.props.assignments.rloading;
    const { classes } = this.props;
    const { data, chapter } = this.props.module;
    let time = !started ? (
      <span style={{ color: 'red', fontSize: '1.2rem' }}>Times up!</span>
    ) : (
        <span style={{ fontSize: '1.2rem' }}>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
      );
    let button = (<Button variant="contained" color="primary" className="buttons" style={{ marginTop: 0 }} onClick={this.startTimer}>Start Test</Button>)
    let timerMarkup = started === true || started === null ? time : button;
    return (
      <>
        <div className={classes.screen}>
          <div className={classes.upperbox}>
            <Typography className={classes.chapname}>{chapter.chapName}
              <span className={classes.timer}>
                {timerMarkup}
              </span>
            </Typography>
            <Typography className={classes.quizname}>{data.name}</Typography>
            {started || started === null ? (
              <div className={classes.timer} >
                <Button variant="contained" color="primary" disabled={Rloading} onClick={this.handleSubmit}>{Rloading ? (<CircularProgress size="1.6rem" />) : <span>Submit</span>}</Button>
              </div>) : null
            }
          </div>
          {started === false || started === null ? null : (
            <div className={classes.quizbox} >
              {data.questions.map((question) => <QuizCard key={question.id} setans={this.setans} question={question} />)}
            </div>
          )}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  lessons: state.lessons,
  assignments: state.assignments,
  user: state.user
})

const mapDispatchToProps = {
  submitQuiz, subAsgnQuiz
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(QuizModule)));