import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles"

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import Bar from "../Components/Bar/Bar";
import TaskList from "../Components/TaskList/TaskList";
import RecordingList from "../Components/RecordingList/RecordingList";
import ActionList from "../Components/ActionList/ActionList";

import { loadSavedTasks } from "../Store/taskActions";


const useStyles = makeStyles({
    root: {
        padding: "5em"
    }
})

export const TodoApp = ({ loadSavedTasks }) => {

    useEffect(() => loadSavedTasks(), [loadSavedTasks])

    const classes = useStyles();
    return (
        <Fragment>
            <Bar>Josh's Todo App</Bar>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={8}>
                    <TaskList />
                </Grid>
                <Grid item xs={4}>
                    <RecordingList />
                    <Divider />
                    <ActionList />
                </Grid>
            </Grid>
        </Fragment>
    );
}

TodoApp.propTypes = {
    loadSavedTasks: PropTypes.func,
}

TodoApp.defaultProps = {
    loadSavedTasks: () => { }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    loadSavedTasks: () => dispatch(loadSavedTasks())
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);