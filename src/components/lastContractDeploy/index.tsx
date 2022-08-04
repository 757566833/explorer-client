import React, { useEffect, useState, useCallback } from 'react'
import { Box, TableFooter, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { IResponseList, ITx } from "@/services/interface";
import { timeRender } from "@/lib/time";
import { weiToEth, weiToGwei } from '@/lib/utils/eth';
import Link from 'next/link';
import { ETxType } from '@/constant/enum';
import Ellipsis from '@/lib/ellipsis';
import { receiverTypeRender } from '@/utils/render';

const LastContractDeploy: React.FC = () => {
    const [data, setData] = useState<ITx[]>([])
    const func1 = useCallback(async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESTFUL}/contract/deploy?size=5`)
        const response: IResponseList<ITx> = await res.json()
        const hits = response.hits.hits
        const nextData: ITx[] = []
        for (const iterator of hits) {
            nextData.push(iterator)
        }
        setData(nextData)
    }, [])
    useEffect(() => {
        func1()
    }, [func1])
    return <>
        <Typography color={theme => theme.palette.text.primary} variant="h6" fontWeight={'bold'}>
            新合同
        </Typography>
        <Typography color={theme => theme.palette.text.primary} variant="body1">
            最新部署的合同
        </Typography>
        <TableContainer component={Paper} elevation={0} variant='outlined'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>hash</TableCell>
                        <TableCell>gas</TableCell>
                        <TableCell>contract</TableCell>
                        <TableCell>模型</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item: ITx) => (
                        <TableRow
                            key={item._source?.hash}
                        >
                            <TableCell>
                                <Ellipsis width={100}>
                                    <Link href={`/tx/${item._source?.hash}`}>{item._source?.hash||''}</Link>
                                </Ellipsis>
                                <Box>{timeRender(item._source?.timestamp)}</Box>
                            </TableCell>
                            <TableCell>
                                <Box>
                                    gas: {weiToGwei(item._source?.gasPrice)}(gwei)
                                </Box>
                                <Box>
                                    limit: {item._source.gasLimit}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Ellipsis width={200}>
                                    deployer: <Link href={`/address/${item._source?.from}`}>{item._source?.from||''}</Link>
                                </Ellipsis>
                                <Ellipsis width={200}>
                                    contract: <Link href={`/address/${item._source?.contractAddress}`}>{item._source?.contractAddress}</Link>
                                </Ellipsis>
                            </TableCell>

                            <TableCell>{ETxType[item._source?.type]}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow><TableCell><Link href={'/txs?page=1&size=10'}>查看全部</Link></TableCell></TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </>
}
export default LastContractDeploy