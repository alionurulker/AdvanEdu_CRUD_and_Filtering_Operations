import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import * as actions from "../actions/aClass";
import * as classActions from "../actions/aClass";
import * as courseActions from "../actions/aCourse";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import AClassForm from "./AClassForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})


const AClass = ({ classes, ...props }) => {

    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchEntityList()
        props.classFetchEntityList()
        props.courseFetchEntityList()
    }, [])//componentDidMount

    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteEntity(id, () => addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.aClassList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.className}</TableCell>
                                            <TableCell>{record.aCourse ? record.aCourse.courseName : ''}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={6}>
                    <AClassForm {...({ currentId, setCurrentId })} />
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    aClassList: state.aClass.list,
    aCourseList: state.aCourse.list
})

const mapActionToProps = {
    fetchEntityList: actions.fetchEntityList,
    deleteEntity: actions.deleteEntity,
    classFetchEntityList: classActions.fetchEntityList,
    courseFetchEntityList: courseActions.fetchEntityList
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AClass));