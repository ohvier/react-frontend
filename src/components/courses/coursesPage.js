import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./courseList";
import { Redirect } from "react-router-dom";

class CoursePage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };
  // this.handleChange = this.handleChange.bind(this);

  // handleChange = event => {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course });
  // };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.actions.createCourse(this.state.course);
  //   //  alert(this.state.course.title);
  // };

  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert("Loading courses failed " + error);
    });

    this.props.actions.loadAuthors().catch(error => {
      alert("Loading authors failed " + error);
    });
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>

        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          AddCourse
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}
CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursePage);
