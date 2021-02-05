import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Typography, IconButton } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CardItem from "../components/CardItem";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const styles = {
  title: {
    paddingTop: 40,
    paddingBottom: 20,
    fontSize: "1rem",
  },
  Add: {
    float: "right",
  },
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

class ChapterSlide extends Component {
  render() {
    const { chap, classes, userid } = this.props;
    console.log(chap);
    const lnk =
      chap.chapName === "Quizes" || chap.chapName === "Submissions"
        ? `/assignment/new/${chap.chapId}`
        : `/module/new/${chap.chapId}`;
    return (
      <div>
        <div className="container">
          <Typography variant="body2" color="primary" className={classes.title}>
            <strong>{chap.chapName}</strong>
            {this.props.user.role === "Teacher" ? (
              <span className={classes.Add}>
                <Link to={lnk}>
                  <IconButton aria-label="delete">
                    <AddIcon color="primary" />
                  </IconButton>
                </Link>
              </span>
            ) : null}
          </Typography>
          <Grid container>
            {chap.videos
              ? chap.videos.map((vid, index) => (
                  <CardItem
                    key={index}
                    data={vid}
                    type="Video"
                    chap={chap.chapId}
                    userid={userid}
                  />
                ))
              : null}
            {chap.reading
              ? chap.reading.map((read, index) => (
                  <CardItem
                    key={index}
                    data={read}
                    type="Reading"
                    chap={chap.chapId}
                    userid={userid}
                  />
                ))
              : null}
            {chap.quiz
              ? chap.quiz.map((que, index) => (
                  <CardItem
                    key={index}
                    data={que}
                    type="Quiz"
                    chap={chap.chapId}
                    mode={chap.chapName === "Quizes"}
                    userid={userid}
                  />
                ))
              : null}
            {chap.submissions
              ? chap.submissions.map((que, index) => (
                  <CardItem
                    key={index}
                    data={que}
                    type="Submission"
                    chap={chap.chapId}
                    userid={userid}
                  />
                ))
              : null}
          </Grid>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChapterSlide));
