import React, { FC } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ApplicationPropsType } from './type';

export const Application: FC<ApplicationPropsType> = () => {
    return (
        <Box padding={2}>
            <Button variant="contained">Copy token</Button>
        </Box>
    );
};
