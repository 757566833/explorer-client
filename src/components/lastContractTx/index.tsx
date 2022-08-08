import React, { useEffect, useState, useCallback } from 'react'
import { Box, TableFooter, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { IResponseList, ITx } from "@/services/interface";
import { timeRender } from "@/lib/time";
import { weiToEth, weiToGwei } from '@/lib/utils/eth';
import Link from 'next/link';
import { ETxType } from '@/constant/enum';
import Ellipsis from '@/lib/ellipsis';
import {contractMethodRender, receiverTypeRender} from '@/utils/render';
import {ContractEvent} from "@/constant/contract";

const LastContractTx: React.FC = () => {
    const [data, setData] = useState<ITx[]>([])
    const func1 = useCallback(async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESTFUL}/contract/txs?size=5`)
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
            最近合同调用
        </Typography>
        <Typography color={theme => theme.palette.text.primary} variant="body1">
            最近关于合同的交易
        </Typography>
        <TableContainer component={Paper} elevation={0} variant='outlined'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>hash</TableCell>
                        {/* <TableCell>number</TableCell> */}
                        <TableCell>time</TableCell>
                        <TableCell>contract</TableCell>
                        <TableCell>method</TableCell>
                        <TableCell>模型</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item: ITx) => (
                        <TableRow
                            key={item._source?.hash}
                        >
                            <TableCell>
                                <Ellipsis width={160}>
                                    {<Link href={`/tx/${item._source?.hash}`}>{item._source?.hash||''}</Link>}
                                </Ellipsis>

                            </TableCell>
                            <TableCell>
                                {timeRender(item._source?.timestamp)}
                            </TableCell>
                            <TableCell>
                                <Ellipsis width={160}>
                                    {<Link href={`/tx/${item._source?.to}`}>{item._source?.to||''}</Link>}
                                </Ellipsis>

                            </TableCell>
                            <TableCell>
                                {contractMethodRender(item._source?.logs[0].topics[0])}
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
export default LastContractTx
