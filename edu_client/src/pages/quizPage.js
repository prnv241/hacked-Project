import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar';
import { getQuizModule } from '../redux/actions/assgnActions';
import QuizModule from '../components/QuizModule';
import Loading from '../components/Loading';


export class quizShow extends Component {

    componentWillReceiveProps(newProps) {
        if (this.props.match.params !== newProps.match.params) {
            let asgnId = newProps.match.params.asgnId;
            let ref = newProps.match.params.id;
            this.props.getQuizModule(asgnId, ref);
        }
    }

    componentDidMount() {
        let asgnId = this.props.match.params.asgnId;
        let ref = this.props.match.params.id;
        this.props.getQuizModule(asgnId, ref);
    }

    render() {
        const {
            quiz,
            loading: { gloading },
        } = this.props.assignments;
        let moduleMarkup = gloading ? <Loading /> : <QuizModule mode={true} module={quiz} />;
        console.log(gloading, moduleMarkup);
        return (
            <>
                <Navbar />
                <div>
                    {moduleMarkup}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    assignments: state.assignments
})

const mapDispatchToProps = {
    getQuizModule
}

export default connect(mapStateToProps, mapDispatchToProps)(quizShow);
