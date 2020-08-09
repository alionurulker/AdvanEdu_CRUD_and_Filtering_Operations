import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextField, Input } from "@material-ui/core";
import * as actions from "../actions/aStudent";
import * as classActions from "../actions/aClass";
import * as courseActions from "../actions/aCourse";
import { Grid, Paper, TableContainer, Table, InputLabel, TableHead, Select, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import AStudentForm from "./AStudentForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

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

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    textBoxSize: {
        minWidth: 118,
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(4),
    },
    selectionBoxSize: {
        minWidth: 135,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AStudent = ({ classes, ...props }) => {

    const [currentId, setCurrentId] = useState(0)

    const handleChange = (event) => {
        console.log(event.target.value);
        props.fetchEntityList(event.target.value, labelName);
    };

    const stylesHead = useStyles();

    const [labelName, setlabelName] = React.useState('');
    
    const handleInputChange = (event) => {
        setlabelName(event.target.value);
    };

    useEffect(() => {
        props.fetchEntityList()
        props.classFetchEntityList()
        props.courseFetchEntityList()
    }, [])//componentDidMount

    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteEntity(id, () => addToast("Deleted successfully", { appearance: 'info' }))
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl className={stylesHead.selectionBoxSize}>
                        <InputLabel htmlFor="demo-customized-select-native">Select an Option</InputLabel>
                        <NativeSelect
                            value={labelName}
                            onChange={handleInputChange}
                            input={<BootstrapInput />}
                        >
                            <option aria-label="None" value="" >Select an Option</option>
                            <option value="Name">Name</option>
                            <option value="Surname">Surname</option>
                            <option value="Class Name">Class Name</option>
                            <option value="Course Name">Course Name</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl className={stylesHead.textBoxSize}>
                        <TextField
                            htmlFor="demo-customized-textbox"
                            name={labelName}
                            variant="outlined"
                            label={labelName}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.aStudentList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.surname}</TableCell>
                                            <TableCell>{record.aClass ? record.aClass.className : ''}</TableCell>
                                            <TableCell>{record.aClass ? record.aClass.aCourse.courseName : ''}</TableCell>
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
                    <AStudentForm {...({ currentId, setCurrentId })} />
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    aStudentList: state.aStudent.list,
    aClassList: state.aClass.list,
    aCourseList: state.aCourse.list
})

const mapActionToProps = {
    fetchEntityList: actions.fetchEntityList,
    deleteEntity: actions.deleteEntity,
    classFetchEntityList: classActions.fetchEntityList,
    courseFetchEntityList: courseActions.fetchEntityList
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AStudent));