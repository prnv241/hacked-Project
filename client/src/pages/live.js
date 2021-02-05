import { Button, List, ListItem } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Navbar from "../components/Navbar";
import { getLives, createLive } from '../redux/actions/assgnActions';
import { v4 as uuidv4 } from "uuid";
import Loading from '../components/logload';

const mapStateToProps = (state) => ({
  assignments: state.assignments,
  user: state.user
});

const mapDispatchToProps = {
  getLives, createLive
};

class live extends Component {
  componentDidMount() {
    this.props.getLives();
  }
  createLive = () => {
    const uid = uuidv4();
    const name = this.props.user.name;
    const userId = this.props.user.id;
    this.props.createLive({ uid, name, userId }, this.props.history);
  };
  render() {
    const { lloading, lives } = this.props.assignments;
    console.log(lloading, lives);
    const list = lloading ? <Loading /> : (
      <List>
        {lives.map((liv, index) => <ListItem key={index}>
          <span>{liv.name}</span><Button onClick={() => this.props.history.push(`/live/${liv.uid}`)}>Join Class</Button>
        </ListItem>)}
      </List>
    )
    return (
      <>
        <Navbar />
        <div>
          <p className="warning">(Live streaming feature can be implimented in future)</p>
          <Button onClick={this.createLive}>Create Session</Button>
          {list}
        </div>
      </>
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(live);
