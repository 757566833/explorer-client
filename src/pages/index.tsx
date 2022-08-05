import React from "react";
import { Box, Grid } from '@mui/material'

import LastBlock from "@/components/lastBlock";
import LastBalanceTx from "@/components/lastBalanceTx";
import LastContractDeploy from "@/components/lastContractDeploy";
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
                <LastBalanceTx/>

            </Grid>
        </Grid>
    </Box>
}
export default Index
