import { Box, BoxTypeMap } from "@mui/material";
import {DefaultComponentProps} from '@mui/material/OverridableComponent';
import React, { PropsWithChildren } from "react";
export interface EllipsisProps extends DefaultComponentProps<BoxTypeMap>{
    ellipsisWidth:number
  }
  export const Ellipsis:React.FC<PropsWithChildren<EllipsisProps>> = (props)=>{
    const {ellipsisWidth=100,...others} = props
    return <Box style={{ width: ellipsisWidth, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} {...others}/>
}
export default Ellipsis
