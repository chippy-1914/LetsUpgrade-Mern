//creation of server
const fs = require("fs");
const http=require("http");
//module used to pass the url 
const url=require("url");



//reading a file 
const productsString=fs.readFileSync("./products.json","utf-8");
const products=JSON.parse(productsString);

const server=http.createServer((req,res)=>{
     
     const path=url.parse(req.url,true);//second paramter will pass query string
    //  console.log(req.method);
    // console.log(url.parse(req.url));
    

    res.writeHead(200,{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST,GET,PATCH,DELETE,PUT",
        "Access-Control-Allow-Headers":"*",
        "Content-Type":"application/json"
    });

    // Handling options
    if(req.method=="OPTIONS")
    {
        res.end();
    }




    if(path.pathname=="/" || path.pathname=="/products" ){
        
        res.end(productsString);
       
    }

    else if(path.pathname=="/product"){
        
        // Handling get request
        if(req.method=="GET"){
            const id=path.query.id;
            const singleData=products.filter((ele)=>{
                return ele.id==id;
            });
            res.end(JSON.stringify(singleData));
        }

        // Handling post request

        else if(req.method=="POST"){
            let body=""
            req.on('data',(data)=>{
                body+=data;
            })
            req.on('end',()=>{
                let product=JSON.parse(body)
                products.push(product)
                fs.writeFile("./products.json",JSON.stringify(products),(err)=>{
                    res.end(JSON.stringify({message:"product added"}));
                })
            })
            
        }
            
        // handling put request
        else if(req.method=="PUT"){
            const id=path.query.id;
            let body="";
            req.on('data',(data)=>{
                body+=data;
            })
            req.on('end',()=>{
                let product=JSON.parse(body);

                products.forEach((ele) => {
                   if (ele.id==id){
                        ele.title=product.title;
                        ele.type=product.type;
                        ele.description=product.description;
                        ele.price=product.price;
                   } 
                });
                fs.writeFile("./products.json",JSON.stringify(products),(err)=>{
                    // res.end(JSON.stringify({message:"product updated"}));

                    const updatedProduct=products.find((ele)=>{

                            return ele.id==id;
                    })

                    res.end(JSON.stringify(updatedProduct));
                })
            
      })
    }
        else if(req.method=="DELETE"){
                   const id=path.query.id;
                    products.forEach((ele,index)=>{
                        if(ele.id==id){
                            products.splice(index,1);
                        }
                    })
                    console.log(products)
                    fs.writeFile("./products.json",JSON.stringify(products),(err)=>{
                        res.end(JSON.stringify({message:"product deleted"}));

                    })
                        // res.end("This is normal")
        }
     
      
    }
    else if(path.pathname=="/updateRating"){

        
        if(req.method=="PUT"){

        
            // product id 
            const id=path.query.id;
            console.log(id);

            // product data
            let body="";
            req.on('data',(data)=>{
                body+=data;
            })

            req.on('end',()=>{
                let product=JSON.parse(body);
            


            products.forEach((ele)=>{
                if(ele.id==id){

                   ele.rating=Number(ele.rating)+Number(product.rating);
                   ele.rating_count=Number(ele.rating_count)+1;
                    

                }
            })

             
            
            fs.writeFile("./products.json",JSON.stringify(products),(err)=>{

                const updatedProduct=products.find((ele)=>{

                        return ele.id==id;
                })

                res.end(JSON.stringify(updatedProduct));
            });

        });


    }                   
        
}                     
                   
        else{
                        //writeHead is used to send headers from server to clients
                        //here using it to send status
                        //  res.writeHead(404);

                         // some browser wont understand whether to treat a content as html tag
                         res.writeHead(404,{
                            "Content-Type":"text/html"}); 
                        //here chrome browser doesnt need above function
                        res.end("<h1>404 Resource not found</h1>"); 

                       
                    }
                    
})
    
server.listen("3000","127.0.0.1",()=>{
    console.log("server has started");
})