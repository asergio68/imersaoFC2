// @flow 
import { Typography } from '@material-ui/core';
import * as React from 'react';
export const Title: React.FunctionComponent = (props) => {
    return (
        <Typography variant='h3'>
            {props.children}
        </Typography>
    );
};