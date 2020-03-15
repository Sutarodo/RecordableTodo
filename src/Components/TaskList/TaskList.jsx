import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import Task from "../Task/Task";
import { TaskShape } from "../../shapes";
import { prepareToAddTask } from "../../Store/Task/TaskAction";

const TaskList = ({ tasks, addTask }) => (
    <>
        <ListSubheader>
            Your Tasks ({tasks.length})
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    onClick={addTask}
                >
                    <AddIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListSubheader>
        <Paper elevation={5}>
            {
                tasks
                    .filter(task => !task.deleted)
                    .sort((a, b) => a.created < b.created)
                    .map(task => (
                        <Task
                            key={task.id}
                            task={task}
                        />))
            }
        </Paper>
    </>
);

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(TaskShape),
    addTask: PropTypes.func,
};

TaskList.defaultProps = {
    tasks: [],
    addTask: () => { }
}

const mapStateToProps = ({ taskState: { tasks } }) => ({ tasks })

const mapDispatchToProps = dispatch => ({
    addTask: () => dispatch(prepareToAddTask()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);