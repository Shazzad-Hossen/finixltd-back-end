


function health(){
    
    this.route.get('/health',(req,res)=>res.status(200).send({status:'OK'}));

}

module.exports=health;