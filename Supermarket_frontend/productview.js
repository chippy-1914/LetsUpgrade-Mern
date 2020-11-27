let url=location.href;
let id=url.split("?")[1].split("=")[1];
console.log(id)


let dummy="";
let ratingString=""
for(let i=1;i<=5;i++)
{
	dummy+=` <i class="fa fa-star notrated" style="font-size: 20px" aria-hidden="true"></i>`;
	
}
for(let i=1;i<=5;i++)
    {
            ratingString+=` <i class="fa fa-star" style="font-size: 20px;color:gold;display:inline" aria-hidden="true"></i>`;
        
    }
fetch("http://localhost:3000/product?id="+id)
.then((response)=>response.json())
.then((product)=>{
        console.log(product)


		let myRating="";
		for(let i=0;i<=4;i++)
		{
			myRating+=` <i class="fa fa-star myrate notrated" onclick="submitRating(${product[0].id})" onmouseover="makeRated(${i})" onmouseout="makeUnRated()" style="font-size: 20px" aria-hidden="true"></i>`;
			
		}

let averageRating=product[0].rating/product[0].rating_count;
let widthPercentage=Math.round((averageRating/5)*100);
    

document.getElementsByClassName("one_product_container")[0].innerHTML=
    `<div class="card" style="width: 60%; height:400px; ">
  		<div class="card-body">
    		<h5 class="card-title">${product[0].title}</h5>
    		<p class="card-text">${product[0].description}</p>
  		</div>
  		<ul class="list-group list-group-flush">
		    <li class="list-group-item">Price :- ${product[0].price}</li>
		    <li class="list-group-item">Type: - ${product[0].type}</li>
			<li class="list-group-item" id="rating" style="height:50px">
			    
			<div id="productRating" style="width:115px;position:absolute">

			<div class="dummystars" style="width:100%;position:absolute">
				${dummy}
			</div>

			<div class="dummystars" style="width:${widthPercentage}%;height:24px;position:absolute;white-space:nowrap;overflow:hidden">
			${ratingString} 
		</div>



		</div>     
		<div id="rating_count" style="position:absolute;left:150px">
		( ${product.rating_count} rating )
		</div>
		
		</li>
		<li class="list-group-item" id="myrating">${myRating} ( Rate Here )</li>
		<li class="list-group-item">Type : ${product[0].type}</li>
  		</ul>
	<div class="card-body">
	    <a href="#" onclick="notavailable()" class="btn btn-success" 
		>Buy Now</a>
	    <a href="#" onclick="notavailable()" class="btn btn-primary">Add to Cart</a>
	</div></div>
	<div class="image_in_card" style="height:400px; width:30%">
	<img src="images/${product[0].image}"  class="card-img-top" style="height:100%" alt="...">
	</div>`
})
	  
function notavailable(a){
	if(a==1){
		document.getElementsByClassName("modal")[0].style.display="none";
	}
	else{
	document.getElementsByClassName("modal")[0].style.display="block";
	}
}
		
function makeRated(index){

	var stars=document.getElementById("myrating").children;

    for(let i=0;i<stars.length;i++){
        stars[i].classList.remove("rated");
		stars[i].classList.add("notrated");
    }

    
    for(let i=0;i<=index;i++){
            stars[i].classList.remove("notrated");
            stars[i].classList.add("rated");

    }

    
}

function makeUnRated(){

    var stars=document.getElementById("myrating").children;

    for(let i=0;i<stars.length;i++){
        stars[i].classList.remove("rated");
        stars[i].classList.add("notrated");
    }
}


function submitRating(id){

    let rating=document.getElementById("myrating").getElementsByClassName("rated").length;

    console.log(JSON.stringify({rating:rating}));

    fetch("http://localhost:3000/updateRating?id="+id,{
        method:"PUT",
        body:JSON.stringify({rating:rating}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((response)=>response.json())
    .then((product)=>{
        
        let averageRating=product[0].rating/product[0].rating_count;
        let widthPercentage=Math.round((averageRating/5)*100);

        console.log(widthPercentage);

        document.getElementById("productRating").innerHTML=`


                <div class="dummystars" style="width:100%;position:absolute">
                    ${dummyRating}
                </div>

                <div class="dummystars" style="width:${widthPercentage}%;height:24px;position:absolute;white-space:nowrap;overflow:hidden">
                    ${ratingString} 
                </div>

        `;


        document.getElementById("rating_count").innerHTML=`
                ( ${product[0].rating_count} rating )
        `;




    })
    .catch((err)=>{
        console.log(err);
    })
}