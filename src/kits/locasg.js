export const KEY="goodsdata";
export var valueObj={goodsid:0,count:0};
export function setItem(value){
    var jsonstr=localStorage.getItem(KEY);
        jsonstr=jsonstr||'[]';
    var arr=JSON.parse(jsonstr);
    arr.push(value);
    localStorage.setItem(KEY,JSON.stringify(arr));
}
export function getItem(){
    var arrstr=localStorage.getItem(KEY);
    arrstr=arrstr||'[]';
    return JSON.parse(arrstr);

}
export function getCarinfo(){
    var arr=getItem();
    var result={};
    var ids = '';
    var res={};
    arr.forEach((item)=>{
        if(!result[item.goodsid]){
            result[item.goodsid]=item.count;
            ids += item.goodsid + ',';
        }else{
            var count = result[item.goodsid];
            result[item.goodsid]=count+item.count;
        }
    })
    res.str=ids;
    res.result=result;
     return res;
}




export function setCarinfo(input){
    var arr=getItem();
    if(input.type=="jia"){
        arr.push({goodsid:input.goodsid,count:1});
    }else{
        for(var i=0;i<arr.length;i++){
            if(arr[i].goodsid==input.goodsid){

                        if(arr[i].count>1){
                            arr[i].count=arr[i].count-1;
                            break;
                        }else{
                          
                                 arr.splice(i,1);
                                break;
                          
                        }
            }
        }
    }
    localStorage.setItem(KEY,JSON.stringify(arr));
}
export function remov(id){
    var arr=getItem();
    for(var i=arr.length-1;i>=0;i--){
        if(arr[i].goodsid==id){
            arr.splice(i,1)
        }
    }
    localStorage.setItem(KEY,JSON.stringify(arr));
}