/*global $*/

/*Fetch data from JSON file*/
window.fetch("./data/test.json")
.then((resp) => {
    return resp.json();
})
.then((data) => {
    
    /*Call function to load Data onto page*/
    loadData(data);
})
.catch(() => {
    console.error("error fetching data")
})

/*Close details icon*/
$(".fa-times").click(() => {
    
    /*Hide details*/
    $("#product-details").hide();
});

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
        loadProduct(item, data);
    });
    
    
    /*Hover on product*/
    $(".product").hover(
        
        function() {
            $(this).find(".hover-product").show();
        },
        
        function() {
            $(this).find(".hover-product").hide();  
        }
    );
}


/*Function that loads each individual product*/
function loadProduct(product) {
    
    let productDiv = document.createElement("div");
    let hoverDiv = document.createElement("div");
    hoverDiv.className = "hover-product";
    hoverDiv.innerHTML = `
        <p>${product.ItemName}</p>
    `;
    
    productDiv.className = "product col-12 col-sm-6 col-md-4 col-lg-3";
    productDiv.innerHTML = `
        
        <img src="${product.PhotoName}" alt="${product.ItemName}">
    
    `;
    
    productDiv.appendChild(hoverDiv);
    
    hoverDiv.addEventListener("click", (e) => {
        loadDetails(product);
    })
    

    
    document.getElementById("product-list").appendChild(productDiv);
    
}

/*Function thaht loads product details based on id*/

function loadDetails(product) {
    
    /*Get DOM Elements*/
    let productDetails = document.getElementById("product-details");
    let detailImage = document.getElementById("detail-image");
    let detailNameH2 = document.getElementById("detail-name");
    let detailIdH6 = document.getElementById("detail-id");
    let detailDexcriptionP = document.getElementById("detail-description");
    let detailDimensionsH6 = document.getElementById("detail-dimensions");
    let detailPriceH6 = document.getElementById("detail-price");
    
    /*Load Data*/
    detailImage.src = product.PhotoName;
    detailImage.alt = product.ItemName;
    detailNameH2.textContent = product.ItemName;
    detailIdH6.textContent = `ID: ${product.ItemID}`;
    detailDexcriptionP.textContent = product.Description;
    detailDimensionsH6.textContent = `Base price: ${product.Dimensions}`;
    detailPriceH6.textContent = `Base Price: ${product.BasePrice}`;
    productDetails.style.display = "flex";
    
    productDetails.scrollIntoView();  
    
}