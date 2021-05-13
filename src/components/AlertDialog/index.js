import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import { Typography } from '@material-ui/core';

import moment from 'moment';

const AlertDialog = (props) => {

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

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle id="alert-dialog-title" className="text-center">
                    Registration Detail
                </DialogTitle>
                <DialogContent>
                    {props.data !== {} && !!props.data.insurer &&
                        <>
                            <Typography variant="h6" color="primary">
                                Insurer Code: {props.data.insurer.code}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Insurer Name: {props.data.insurer.name}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Plate Number: {props.data.plate_number}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Expiry Date: {moment(props.data.registration.expiry_date).format('DD/MM/YYYY')}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Status:  {
                                    getExpiredStatus(props.data.registration.expiry_date) ?
                                        monthDiff(props.data.registration.expiry_date) + " months"
                                        :
                                        "Expired"
                                }
                            </Typography>
                            <Typography variant="h5" color="primary">
                                Car Details
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Color: {props.data.vehicle.colour}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Gross Mass: {props.data.vehicle.gross_mass}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Make: {props.data.vehicle.make}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Model: {props.data.vehicle.model}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Tare Weight: {props.data.vehicle.tare_weight}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Type: {props.data.vehicle.type}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                VIN: {props.data.vehicle.vin.slice(-4)}
                            </Typography>
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;