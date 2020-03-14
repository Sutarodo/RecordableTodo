import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

import { TaskShape } from "../../shapes";
import { saveTask } from "../../Store/taskActions";

const useStyles = makeStyles({
    root: {
        marginRight: "1.5em"
    }
})

const Task = ({ task, save }) => {
    const classes = useStyles();
    const [editing, setEditing] = useState(!task.id);

    const invertEditing = () => setEditing(!editing);

    const handleChange = ({ target: { name, value } }) => save(task, name, value)

    useEffect(() => {
        if (task.id) {
            // TODO: Redux action for Save.
        } else {
            // TODO: redux action for insert.
        }
    }, [task])

    const renderDisplay = () => (
        <>
            <ListItemText
                primary={`${task.name} - ${task.description}`}
                secondary={task.created} // TODO: use humanizer to make pretty
            />
            <ListItemSecondaryAction>
                <IconButton
                    className={classes.root}
                    edge="end"
                    onClick={invertEditing}
                >
                    <CreateIcon />
                </IconButton>
            </ListItemSecondaryAction>
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </>
    )



    const renderEditing = () => (
        <>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <TextField
                        label="Name"
                        value={task.name}
                        onChange={handleChange}
                        inputProps={{ name: "name" }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Description"
                        value={task.description}
                        onChange={handleChange}
                        inputProps={{ name: "description" }}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                >
                    <SaveIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </>
    )


    return (
        <ListItem divider>
            {
                editing ? renderEditing() : renderDisplay()
            }
        </ListItem>
    );
}

Task.propTypes = {
    task: TaskShape.isRequired,
    save: PropTypes.func,
};

Task.defaultProps = {
    save: () => { }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    save: (task, fieldName, newValue) => dispatch(saveTask(task, fieldName, newValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);