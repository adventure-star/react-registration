import React, { useState, useEffect } from 'react'
import { Typography, Card, CardContent, CardHeader, LinearProgress } from '@material-ui/core'
import WithHeaderLayout from '../../layouts/WithHeaderLayout';
import AlertDialog from '../../components/AlertDialog';
import { Link, useHistory } from 'react-router-dom';
import { apiGetAllSurveys, apiGetAllRegistrations } from '../../services/news';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Collapse } from 'react-collapse';


const List = () => {

    const [loading, setLoading] = useState(true);

    const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");

    const [list, setList] = useState([]);

    const [data, setData] = useState({});

    useEffect(() => {
        getAllRegistrations();
    }, []);

    const getAllRegistrations = () => {
        apiGetAllRegistrations()
            .then(res => {
                console.log("result-----", res);
                setList(res.registrations);
                setLoading(false);
            })
            .catch(function (error) {
                // Handle Errors here.
                setLoading(false);
                console.log('===== error: ', error);
                setError(error.message);
                setAlert(true);
                setLoading(false);
                // ...
            });
    }

    const onClose = () => {
        setAlert(false);
    }

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const getExpiredStatus = (date) => {
        return new Date(date) > new Date();
    }

    const monthDiff = (date) => {
        var months;
        months = (new Date(date).getFullYear() - new Date().getFullYear()) * 12;
        months -= new Date().getMonth();
        months += new Date(date).getMonth();
        return months <= 0 ? 0 : months;
    }

    const openModal = index => {

        setData(list[index]);
        setAlert(true);
    }

    return (
        <WithHeaderLayout title="User Screen">
            {loading &&
                <LinearProgress color="secondary" />
            }
            <div className="p-8">
                <div className="mx-auto" style={{ maxWidth: "600px" }}>
                    <div className="w-full ">
                        <div className="w-full text-center">
                            <Typography variant="h3" color="primary">
                                All Registrations
                            </Typography>
                        </div>
                        {list.length !== 0 &&
                            <Card className="mt-12">
                                <div className="">
                                    <CardContent className="">
                                        <TableContainer component={Paper}>
                                            <Table aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="center">RegoNumber</StyledTableCell>
                                                        <StyledTableCell align="center">Car Details</StyledTableCell>
                                                        <StyledTableCell align="center">Expiry/Status</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {list.map((item, index) => (
                                                        <StyledTableRow key={item.insurer.code} onClick={() => openModal(index)} className="cursor-pointer">
                                                            <StyledTableCell component="th" scope="row" align="center">
                                                                {item.insurer.code}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {
                                                                    Object.keys(item.vehicle).map(key => (
                                                                        <div key={key}>{key}: {key === "vin" ? item.vehicle[key].slice(-4) : item.vehicle[key]}</div>
                                                                    ))
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {
                                                                    getExpiredStatus(item.registration.expiry_date) ?
                                                                        monthDiff(item.registration.expiry_date) + " months"
                                                                        :
                                                                        "Expired"
                                                                }
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </div>
                            </Card>
                        }
                        <AlertDialog item="User Id" data={data} open={alert} handleClose={onClose} />
                    </div>
                </div>
            </div>
        </WithHeaderLayout>
    )
}

export default List;