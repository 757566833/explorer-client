import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link';
import { Box, Chip, TablePagination, TableFooter, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, useTheme, IconButton } from '@mui/material'
import { LastPage, FirstPage, KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material'
import {ethers} from 'ethers'
import {ITx, IResponseList, IAddressListItem, EAddressType} from "@/services/interface";
import { timeRender } from "@/lib/time";
import { useRouter } from 'next/router';
import { ETxType } from '@/constant/enum';
import Provider from '@/instance/provider';
import { weiToEth } from '@/lib/utils/eth';
import Ellipsis from '@/lib/ellipsis';
import { useClintNavigation } from '@/hooks/navigation';

const Address: React.FC = () => {
    const theme = useTheme();
    const [data, setData] = useState<ITx[]>([])
    const [balance, setBalance] = useState("")
    const router = useRouter();
    const [clientNavigation] = useClintNavigation()
    const [type,setType] = useState("address")
    const { query } = router
    const { address ,size='10',page='1' } = query
    const func1 = useCallback(async (page: string,size:string, address: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESTFUL}/address/${address}?page=${page}&size=${size}`)
        const response: IResponseList<ITx> = await res.json()
        const hits = response.hits.hits
        const nextData: ITx[] = []
        for (const iterator of hits) {
            nextData.push(iterator)
        }
        setData(nextData)
    }, [])
    const getAddressesDetail = useCallback(async (address: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESTFUL}/addresses/detail?addresses=${address.toString()}`)
        const response: IResponseList<IAddressListItem> = await res.json()
        const type =  EAddressType[response.hits.hits[0]._source.type]
        setType(type)
    }, [])
    const func2 = useCallback(async (address: string) => {
        const instance = await Provider.getInstance();
        const res = await instance.getBalance(address)
        setBalance(res.toString())
    }, [])
    const handleBackButtonClick = useCallback(() => {
        clientNavigation.push(`/address/${address}?page=${ethers.BigNumber.from(page).sub(1).toString()}&size=${size}`).then()
    },[address, clientNavigation, page, size]);

    const handleNextButtonClick =useCallback( () => {
        clientNavigation.push(`/address/${address}?page=${ethers.BigNumber.from(page).add(1).toString()}&size=${size}`).then()
    },[address, clientNavigation, page, size]);

const refreshAddress =useCallback(async ()=>{
    if(address){
        await fetch(`${process.env.NEXT_PUBLIC_RESTFUL}/refresh/${address?.toString()}`,{
            method:"POST"
        })
        getAddressesDetail(address?.toString()).then()
    }

},[])

    useEffect(() => {
        if (address) {
            func1(page.toString(),size.toString(), address.toString()).then()
            func2(address.toString()).then()
            getAddressesDetail(address?.toString()).then()
        }

    }, [page, address, func1, func2, size, getAddressesDetail])

    return <Box width={1400} margin='0 auto'>
         <Typography color={theme => theme.palette.text.primary} variant="h5" fontWeight={'bold'} paddingTop={3} height={58}>
             {type}<Button variant={"text"} onClick={refreshAddress}>类型错误？点击刷新</Button>
        </Typography>
        <Typography color={theme => theme.palette.text.primary} variant="body1" >
            {address}
        </Typography>
        <Typography color={theme => theme.palette.text.primary} variant="body1" >
            {weiToEth(balance)} eth
        </Typography>

        <TableContainer component={Paper} elevation={0} variant='outlined'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>hash</TableCell>
                        <TableCell>timestamp</TableCell>
                        <TableCell>number</TableCell>
                        <TableCell>from</TableCell>
                        <TableCell>to</TableCell>
                        <TableCell>type</TableCell>
                        <TableCell>value</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item: ITx) => (
                        <TableRow
                            key={item._source?.number}
                        >
                            <TableCell>
                                <Ellipsis ellipsisWidth={160}>
                                    <Link href={`/tx/${item._source?.hash}`}>{item._source?.hash || ''}</Link>
                                </Ellipsis>
                            </TableCell>
                            <TableCell >
                                <Box width={140}>{timeRender(item._source?.timestamp)}</Box>
                            </TableCell>
                            <TableCell><Link href={`/block/${item._source?.number}`}>{item._source?.number || ''}</Link></TableCell>
                            <TableCell>
                                {address == item._source.from ? <Chip label={<Ellipsis ellipsisWidth={160}>
                                    <Link href={`/address/${item._source?.from}`} passHref={true}>
                                        <a style={{ color: '#ffffff' }}>{item._source?.from || ''}</a>
                                    </Link>
                                </Ellipsis>} color="primary" /> : <Ellipsis ellipsisWidth={160}>
                                    <Link href={`/address/${item._source?.from}`}>{item._source?.from || ''}</Link>
                                </Ellipsis>}

                            </TableCell>
                            <TableCell>

                                {address == item._source.to ? <Chip label={<Ellipsis ellipsisWidth={160}>
                                    <Link href={`/address/${item._source?.to}`} passHref={true}><a style={{ color: '#ffffff' }}>{item._source?.to || ''}</a></Link>
                                </Ellipsis>} color="primary" /> : <Ellipsis ellipsisWidth={160}>
                                    <Link href={`/address/${item._source?.to}`}>{item._source?.to || ''}</Link>
                                </Ellipsis>}

                            </TableCell>
                            <TableCell>{ETxType[item._source?.type]}</TableCell>
                            <TableCell>{weiToEth(item._source?.value)} eth</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>
                            <Box display={'flex'}>

                                <IconButton
                                    onClick={handleBackButtonClick}
                                    disabled={page.toString() == '1'}
                                    aria-label="previous page"
                                >
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                </IconButton>
                                <IconButton
                                    onClick={handleNextButtonClick}
                                    aria-label="next page"
                                >
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </IconButton>

                            </Box>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </Box>
}
export default Address;
