import React, {useCallback, useEffect, useState} from 'react'
import {Box, List, ListItem, ListItemText, Typography, Divider, Paper, ListItemIcon} from "@mui/material"
import {useRouter} from 'next/router'
import {EAddressType, IAddress, IAddressListItem, IResponseList, ITx} from '@/services/interface';
import {timeRender} from '@/lib/time';
import {weiToEth, weiToGwei} from '@/lib/utils/eth';
import {ETxStatus, ETxType} from '@/constant/enum';
import Link from 'next/link';
import ContractDetail from "@/lib/contract/detai";

const Block: React.FC = () => {
    const router = useRouter();
    const {query} = router
    const {tx} = query
    const [data, setData] = useState<Partial<ITx>>({})
    const func = useCallback(async (tx: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESTFUL}/tx/${tx}`)
        const response: ITx = await res.json()
        setData(response)
    }, [])
    useEffect(() => {
        if (tx) {
            func(tx.toString())
        }

    }, [func, tx])
    const [addressMap, setAddressMap] = useState<{ [key: string]: string }>({});
    const getAddressesDetail = useCallback(async (addresses: string[]) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESTFUL}/addresses/detail?addresses=${addresses.toString()}`)
        const response: IResponseList<IAddressListItem> = await res.json()
        const map: { [key: string]: string } = {}
        for (let i = 0; i < response.hits.hits.length; i++) {
            map[response.hits.hits[i]._id] = EAddressType[response.hits.hits[i]._source.type]
        }
        setAddressMap(map)
    }, [])
    useEffect(() => {
        const addresses: string[] = [data._source?.from, data._source?.to, data._source?.contractAddress].filter((item) => item) as string[];
        if (addresses.length > 0) {
            getAddressesDetail(addresses).then()
        }

    }, [data._source?.from, data._source?.to, data._source?.contractAddress, getAddressesDetail])
    return <Box width={1400} margin='0 auto'>
        <Typography color={theme => theme.palette.text.primary} variant="h5" fontWeight={'bold'} padding={3}>
            tx
        </Typography>
        <Paper variant='outlined'>
            <List>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        hash 交易hash
                    </ListItemIcon>
                    <ListItemText primary={data._source?.hash}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        number 所在块
                    </ListItemIcon>
                    <ListItemText
                        primary={<Link href={`/block/${data._source?.number}`}>{data._source?.number || ''}</Link>}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        blockHash
                    </ListItemIcon>
                    <ListItemText primary={<Link href={`/block/${data._source?.from}`}>{data._source?.blockHash||''}</Link>}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        timestamp
                    </ListItemIcon>
                    <ListItemText primary={timeRender(data._source?.timestamp)}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        status
                    </ListItemIcon>
                    <ListItemText primary={data._source?.status != undefined ? ETxStatus[data._source?.status] : ''}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        from 发出方
                    </ListItemIcon>
                    <ListItemText primary={<Link href={`/address/${data._source?.from}`}>{data._source?.from||''}</Link>}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        to
                    </ListItemIcon>
                    <ListItemText primary={<>{addressMap[data._source?.to||'']} <Link href={`/address/${data._source?.to}`}>{data._source?.to||''}</Link></>}/>
                </ListItem>
                <Divider/>
                <ContractDetail logs={data._source?.logs}/>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        contractAddress
                    </ListItemIcon>
                    <ListItemText primary={data._source?.contractAddress}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        value
                    </ListItemIcon>
                    <ListItemText primary={`${weiToEth(data._source?.value)} eth`}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        transactionFee
                    </ListItemIcon>
                    <ListItemText primary={data._source?.transactionFee}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        gas price
                    </ListItemIcon>
                    <ListItemText primary={`${weiToGwei(data._source?.gasPrice)} gwei`}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        gas limit
                    </ListItemIcon>
                    <ListItemText primary={data._source?.gasLimit}/>
                </ListItem>
                <Divider/>

                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        gasUsed
                    </ListItemIcon>
                    <ListItemText primary={data._source?.gasUsed}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        cumulativeGasUsed
                    </ListItemIcon>
                    <ListItemText primary={data._source?.cumulativeGasUsed}/>
                </ListItem>
                <Divider/>

                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        maxFeePerGas
                    </ListItemIcon>
                    <ListItemText primary={data._source?.maxFeePerGas}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        maxPriorityFeePerGas
                    </ListItemIcon>
                    <ListItemText primary={data._source?.maxPriorityFeePerGas}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        nonce
                    </ListItemIcon>
                    <ListItemText primary={data._source?.nonce}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        r
                    </ListItemIcon>
                    <ListItemText primary={data._source?.r}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        s
                    </ListItemIcon>
                    <ListItemText primary={data._source?.s}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        v
                    </ListItemIcon>
                    <ListItemText primary={data._source?.v}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        type
                    </ListItemIcon>
                    <ListItemText primary={data._source?.type != undefined ? ETxType[data._source?.type] : ''}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        input
                    </ListItemIcon>
                    <ListItemText primary={data._source?.input}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        isFake
                    </ListItemIcon>
                    <ListItemText primary={`${data._source?.isFake}`}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon sx={{width: 280}}>
                        transactionIndex
                    </ListItemIcon>
                    <ListItemText primary={`${data._source?.transactionIndex}`}/>
                </ListItem>
            </List>
        </Paper>
    </Box>
}
export default Block;
