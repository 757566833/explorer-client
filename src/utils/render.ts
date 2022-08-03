export const receiverTypeRender = (to?:string,contractAddress?:string)=>{
    let result = ''
    if(to){
        result +='balance'
    }
    if(contractAddress&&contractAddress!="0x0000000000000000000000000000000000000000"){
        if(to){
            result+='/contract'
        }else{
            result+='contract'
        }
    }
    return result

}