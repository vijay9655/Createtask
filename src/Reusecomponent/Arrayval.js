const Arrayval=(find,values)=>{
    if(values.length){
    var keydata= Object.keys(values)
    var valdata= Object.values(values)
    for (let i=0; i < keydata.length; i++) {
       
        
        if (keydata[i]==find) {
           
            return valdata[i]
        }



    }
    
    }
    else{
        return null
    }
}
export default Arrayval;