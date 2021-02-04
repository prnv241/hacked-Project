import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import withStyles from '@material-ui/core/styles/withStyles'
import { Typography, TextField, Button } from '@material-ui/core'
import { addSub } from '../redux/actions/assgnActions';

const styles = {
    contain: {
        width: '30vw',
        textAlign: 'center'
    },
    outer: {
        marginLeft: '20vw'
    },
    TextField: {
        display: 'block',
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
    },
    or: {
        marginTop: 20,
        fontSize: '1.2rem'
    },
    title: {
        fontSize: '2.2rem',
        marginTop: 40,
        marginLeft: '5vw'
    },
    button: {
        marginTop: 20
    }
}
export class newAsgn extends Component {
    state = {
        desc: '',
        name: '',
        marks: '',
        deadline: '',
        time: '',
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = () => {
        const subData = {
            desc: this.state.desc,
            name: this.state.name,
            marks: this.state.marks,
            deadline: this.state.deadline,
            time: this.state.time
        }
        const asgnId = this.props.match.params.asgnId;
        console.log(subData);
        this.props.addSub(subData, asgnId, this.props.history);
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Navbar />
                <div className="container">
                    <div className={classes.outer}>
                        <Typography className={classes.title} color="textPrimary">
                            Add a new Assignment
            </Typography>
                        <form noValidate className={classes.contain}>
                            <TextField name="name" type="text" placeholder="Name of the assignment" label="Name" className={classes.TextField} value={this.state.name} onChange={this.handleChange} fullWidth />
                            <TextField name="time" type="text" placeholder="Required time to complete" label="Time" className={classes.TextField} value={this.state.time} onChange={this.handleChange} fullWidth />
                            <TextField name="desc" type="text" placeholder="Description of the assignment" label="Description" className={classes.TextField} multiline rows={4} value={this.state.desc} onChange={this.handleChange} fullWidth />
                            <TextField name="marks" type="text" placeholder="Maximum marks for this assignment" label="Marks" className={classes.TextField} value={this.state.marks} onChange={this.handleChange} fullWidth />
                            <TextField name="deadline" type="text" placeholder="Deadline for this assignment" label="Deadline" className={classes.TextField} value={this.state.deadline} onChange={this.handleChange} fullWidth />
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>Submit</Button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    assignments: state.assignments
})

const mapDispatchToProps = {
    addSub
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(newAsgn))
