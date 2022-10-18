import React, { FC } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ApplicationPropsType } from './type';
import { useApplication } from './hooks/useApplication';

export const Application: FC<ApplicationPropsType> = () => {
    const { copyTokenProps } = useApplication();

    return (
        <Box padding={2}>
            <Button variant="contained" {...copyTokenProps}>
                Copy token
            </Button>
        </Box>
    );
};
