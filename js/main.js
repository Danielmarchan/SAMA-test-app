/*global $*/

/*Fetch data from JSON file*/
window.fetch("./data/test.json")
.then(function(resp) {
    return resp.json();
})
.then(function(data) {
    
    /*Call function to load Data onto page*/
    loadData(data);
})
.catch(function() {
    console.log("error fetching data")
})


/*Function that loads data into page*/
function loadData(data) {
    
    /*Get HTML DOM Elements*/
    let companyNameH1 = document.getElementById("company-name");
    let companyImg = document.getElementById("company-logo")
    let messageDiv = document.getElementById("message");
    let emailP = document.getElementById("email");
    
    /*Display Intro data*/
    companyNameH1.innerText = data.CompanyName;
    
    companyImg.src = `http://images.repzio.com/productimages/${ data.ManufacturerID }/logo${ data.ManufacturerID }_lg.jpg`;
    
    messageDiv.innerHTML = data.Message;
    
    emailP.innerText = data.EmailAddress;
    emailP.href = `mailto: ${data.EmailAddress}`;
    
    /*Display product array*/
    data.items.forEach(function(item) {
        loadProduct(item);
    });
}


/*Function that loads each individual product*/
function loadProduct(product) {
    
    var productDiv = document.createElement("div");
    productDiv.className = "product col-12 col-sm-6 col-md-4 col-lg-3";
    productDiv.innerHTML = `
        
        <img src="${product.PhotoName}" alt="${product.ItemName}">
    
    `
    
    document.getElementById("product-list").appendChild(productDiv);
}