import React, { FC } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ApplicationPropsType } from './type';
import { useApplication } from './hooks/useApplication';

export const Application: FC<ApplicationPropsType> = () => {
    const { copyTokenProps, showSent } = useApplication();

    return (
        <Box padding={2}>
            <Button variant="contained" {...copyTokenProps}>
                {
                    showSent
                    ?
                    "Sent!"
                    :
                    "Copy token"
                }
            </Button>
        </Box>
    );
};
