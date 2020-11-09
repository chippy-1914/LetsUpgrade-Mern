let dataset=[
    {

        id:1,
        name:"Thor",
        age:343,
        planet:"Asgard",
        weapons:"stormbreaker"
        
    },
    {
        id:2,
        name:"Valkyre",
        age:233,
        planet:"Asgard",
        weapons:"spear"

    },
    {
        id:3,
        name:"Hulk",
        age:45,
        planet:"Earth",
        weapons:"Jarvis"

    },
    {
        id:4,
        name:"Doctor stranger",
        age:54,
        planet:"Earth",
        weapons:"time stone"

    },
    {
        id:5,
        name:"Black widow",
        age:33,
        planet:"Earth",
        weapons:"Strength"

    }
]

const http=require("http");
const url=require("url");

const server=http.createServer((req,res)=>{
    const path=url.parse(req.url,true);
    
    // console.log(path.pathname)
    if(path.pathname=="/" || path.pathname=="/superheroes")
    {
        // console.log(dataset)
        res.writeHead(200,{
            "Content-Type":"application/json"
        })
        let datasetjson=JSON.stringify(dataset)
        res.end(datasetjson)
    }
    else if(path.pathname=="/superhero")
    {
        if(req.method=="GET")
        {

            const id=path.query.id;
            // console.log(id)
            let hero=dataset.filter((ele)=>{
                return ele.id==id
            })
            res.end(JSON.stringify(hero))
        }
        else if(req.method=="POST")
        {
            let body="";
            req.on('data',(data)=>{
                body+=data;
            })
            req.on('end',()=>{
                let body_object=JSON.parse(body)
                dataset.push(body_object)
                res.end(JSON.stringify(dataset))
            })
            
            
        }
        else if(req.method=="PUT")
        {
            const id=path.query.id;
            let body="";
            req.on('data',(data)=>{
                body+=data;
            })
            req.on('end',()=>{
                let body_object=JSON.parse(body)
            // console.log(body_object)
            dataset.forEach(hero => {
                if(hero.id==body_object.id)
                {
                    hero.id=body_object.id,
                    hero.name=body_object.name,
                    hero.weapons=body_object.weapons,
                    hero.age=body_object.age,
                    hero.planet=body_object.planet
                }
            });
            res.end(JSON.stringify(dataset))
            })
        }
        else if(req.method=="DELETE"){
            const id = path.query.id;
            dataset.forEach((hero,index) => {
                if(hero.id==id)
                {
                    dataset.splice(index,1);
                }
                
            });
            res.end(JSON.stringify(dataset))
        }
        
    }
    else{
        res.writeHead(404,{
            "Content-type":"text/html"
        });
        res.end("<h1>404 resource not found<h1>")
    }

    
})
server.listen("3000","127.0.0.1",()=>{
    console.log("Server has started")
})