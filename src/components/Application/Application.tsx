import React, { FC } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ApplicationPropsType } from './type';
import { useApplication } from './hooks/useApplication';

export const Application: FC<ApplicationPropsType> = () => {
    const { copyTokenProps, showConfirmation } = useApplication();

    return (
        <Box padding={2} width={200}>
            <Button variant="contained" fullWidth {...copyTokenProps}>
                {showConfirmation && 'Copied!'}
                {!showConfirmation && 'Copy token'}
            </Button>
        </Box>
    );
};
