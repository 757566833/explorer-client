import React from "react";
import {Box, Button, Grid} from '@mui/material'

import LastBlock from "@/components/lastBlock";
import LastContractTx from "@/components/lastContractTx";
import LastContractDeploy from "@/components/lastContract";
import LastTx from "@/components/lastTx";
const Index: React.FC = () => {
    return <Box width={1400} margin='0 auto'>
        <Grid container spacing={3} padding={3}>
            <Grid item xs={6}>
                <LastBlock/>
            </Grid>
            <Grid item xs={6}>
                <LastTx/>

            </Grid>
            <Grid item xs={6}>
                <LastContractDeploy/>

            </Grid>
            <Grid item xs={6}>
                <LastContractTx/>

            </Grid>
        </Grid>
    </Box>
}
export default Index
