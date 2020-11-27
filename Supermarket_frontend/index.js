fetch("http://localhost:3000/products")
.then((response)=>response.json())
.then(products=>{


    let productsString="";

    products.forEach(product => {
        
        
            productsString+=`<div class="card" style="width: 18rem;">
                              <img src="images/${product.image}" style="height:50%;width:100%;"  class="card-img-top" alt="${product.image}">
                              <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.description}</p>
                                <a href="productview.html?id=${product.id}" class="btn btn-primary">View Product</a>
                              </div>
                            </div>`
    
    });

    document.getElementById("product_container").innerHTML=productsString;
})
    