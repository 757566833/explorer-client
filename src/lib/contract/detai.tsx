import React, {useMemo} from "react";
import {log} from "@/services/interface";
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {ContractEvent} from "@/constant/contract";
import Ellipsis from "@/lib/ellipsis";
export  interface  ContractDetailProps{
    logs?:log[]
}
export const ContractDetail:React.FC<ContractDetailProps> = (props)=>{
    const {logs} = props;
    const _logs = useMemo(()=>logs?logs:[],[logs]);
    const list = useMemo(()=>{
        const list : { contract:string,
            method:string,
            str:string }[] =[]
        for (const log of _logs) {
            const {topics} = log
            const [key,...params] = topics
            const event = ContractEvent[key]
            if(event){
                const item ={
                    contract:log.address,
                    method:event.method,
                    str:''
                }
                for (const [i,p] of event.parameter.entries()) {
                    if(params[i]){
                        item.str+=`${p.name}:${params[i]};`
                    }

                }
                list.push(item)
            }

        }
        return list
    },[_logs])
    return <>
        {list.map((item,index)=>{
            return  <ListItem key={`${item.contract}${index}`}>
                <ListItemIcon sx={{ width: 280 }}>
                    <Ellipsis ellipsisWidth={240}>
                        {item.contract}
                    </Ellipsis>

                </ListItemIcon>
                <ListItemText primary={`${item.method}:${item.str}`} />
            </ListItem>
        },[])}

    </>
}
export  default  ContractDetail;
