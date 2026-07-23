// DiscordHub gebruikers functies


async function register(){


let username = document.getElementById("username").value;

let email = document.getElementById("email").value;

let password = document.getElementById("password").value;



if(username=="" || email=="" || password==""){

alert("Vul alles in!");

return;

}



try{


let userCredential = await auth.createUserWithEmailAndPassword(
email,
password
);



let user = userCredential.user;



await db.collection("users").doc(user.uid).set({

username: username,

email: email,

role:"gebruiker",

created: new Date()

});



alert("Account succesvol gemaakt!");

window.location.href="dashboard.html";


}


catch(error){

alert(error.message);

}


}



async function login(){


let email = document.getElementById("loginEmail").value;

let password = document.getElementById("loginPassword").value;



if(email=="" || password==""){

alert("Vul alles in!");

return;

}



try{


await auth.signInWithEmailAndPassword(
email,
password
);



alert("Welkom terug!");

window.location.href="dashboard.html";


}


catch(error){

alert("Login mislukt: " + error.message);

}


}



function logout(){

localStorage.clear();

window.location.href="index.html";

}
function searchCommunity(){

let input = document.getElementById("search").value.toLowerCase();

let cards = document.getElementsByClassName("community");


for(let i = 0; i < cards.length; i++){

let text = cards[i].innerText.toLowerCase();


if(text.includes(input)){

cards[i].style.display="block";

}

else{

cards[i].style.display="none";

}

}

}
async function addCommunity(){


let name = document.getElementById("communityName").value;

let category = document.getElementById("communityCategory").value;

let desc = document.getElementById("communityDesc").value;



if(name=="" || category=="" || desc==""){

alert("Vul alles in!");

return;

}



try{


await db.collection("communities").add({

name:name,

category:category,

desc:desc,

created:new Date()

});



alert("Community toegevoegd!");

window.location.href="communities.html";


}


catch(error){

alert(error.message);

}


}
function loadCommunities(){

let list = JSON.parse(localStorage.getItem("communities")) || [];

let box = document.getElementById("newCommunities");


if(box){

box.innerHTML="";


list.forEach(function(community){


box.innerHTML += `

<div class="card community">

<h3>🌍 ${community.name}</h3>

<p>${community.desc}</p>

<p>Categorie: ${community.category}</p>

<button class="btn" onclick='openCommunity(${JSON.stringify(community)})'>
Bekijk
</button>

</div>

`;


});


}

}


window.onload = function(){

loadCommunities();

};
function openCommunity(community){

localStorage.setItem(
"selectedCommunity",
JSON.stringify(community)
);

window.location.href="community.html";

}
function addPartner(){

let name = document.getElementById("partnerName").value;
let owner = document.getElementById("partnerOwner").value;
let desc = document.getElementById("partnerDesc").value;


let partner = {

name:name,
owner:owner,
desc:desc

};


let partners = JSON.parse(localStorage.getItem("partners")) || [];


partners.push(partner);


localStorage.setItem(
"partners",
JSON.stringify(partners)
);


alert("Partner aanvraag verstuurd!");

loadPartners();

}



function loadPartners(){

let partners = JSON.parse(localStorage.getItem("partners")) || [];

let box = document.getElementById("partnerList");


if(box){

box.innerHTML="";


partners.forEach(function(partner){


box.innerHTML += `

<div class="card">

<h3>🤝 ${partner.name}</h3>

<p>${partner.desc}</p>

<p>Eigenaar: ${partner.owner}</p>

</div>

`;


});


}

}


window.addEventListener("load",loadPartners);
function loadAdminPartners(){

let partners = JSON.parse(localStorage.getItem("partners")) || [];

let box = document.getElementById("adminPartners");


if(box){

box.innerHTML="";


partners.forEach(function(partner,index){


box.innerHTML += `

<div class="card">

<h3>🤝 ${partner.name}</h3>

<p>${partner.desc}</p>

<p>Eigenaar: ${partner.owner}</p>


<button class="btn" onclick="approvePartner(${index})">
Goedkeuren
</button>


<button class="btn second" onclick="removePartner(${index})">
Weigeren
</button>


</div>

`;

});


}

}



function approvePartner(index){

alert("Partner goedgekeurd!");

}



function removePartner(index){

let partners = JSON.parse(localStorage.getItem("partners")) || [];


partners.splice(index,1);


localStorage.setItem(
"partners",
JSON.stringify(partners)
);


loadAdminPartners();

}



window.addEventListener("load",loadAdminPartners);
async function addProduct(){


let name = document.getElementById("productName").value;

let price = document.getElementById("productPrice").value;

let type = document.getElementById("productType").value;

let desc = document.getElementById("productDesc").value;



if(name=="" || price=="" || type=="" || desc==""){

alert("Vul alles in!");

return;

}



try{


await db.collection("products").add({

name:name,

price:price,

type:type,

desc:desc,

created:new Date()

});



alert("Product toegevoegd!");

window.location.href="marketplace.html";


}


catch(error){

alert(error.message);

}


}
function loadProducts(){

let products = JSON.parse(localStorage.getItem("products")) || [];

let box = document.getElementById("productList");


if(box){

box.innerHTML="";


products.forEach(function(product){


box.innerHTML += `

<div class="card">

<h3>🛒 ${product.name}</h3>

<p>${product.desc}</p>

<p>Type: ${product.type}</p>

<p>Prijs: €${product.price}</p>

<button class="btn" onclick='checkout(${JSON.stringify(product)})'>
Kopen
</button>

</div>

`;


});


}

}


window.addEventListener("load",loadProducts);
function addToCart(product){


let cart = JSON.parse(localStorage.getItem("cart")) || [];


cart.push(product);


localStorage.setItem(
"cart",
JSON.stringify(cart)
);


alert("Toegevoegd aan winkelwagen!");

}



function loadCart(){


let cart = JSON.parse(localStorage.getItem("cart")) || [];


let box = document.getElementById("cartList");


let total = 0;


if(box){


box.innerHTML="";


cart.forEach(function(product){


total += Number(product.price);


box.innerHTML += `

<div class="card">

<h3>${product.name}</h3>

<p>${product.desc}</p>

<p>€${product.price}</p>

</div>

`;

});


document.getElementById("total").innerHTML =
"Totaal: €" + total;


}

}



window.addEventListener("load",loadCart);
function loadAdminStats(){


let users = localStorage.getItem("email") ? 1 : 0;

let communities =
JSON.parse(localStorage.getItem("communities")) || [];


let products =
JSON.parse(localStorage.getItem("products")) || [];



if(document.getElementById("usersCount")){

document.getElementById("usersCount").innerHTML = users;

document.getElementById("communityCount").innerHTML =
communities.length;

document.getElementById("productCount").innerHTML =
products.length;

}


}


window.addEventListener("load",loadAdminStats);
function loadAdminLists(){


let userBox = document.getElementById("adminUsers");
let communityBox = document.getElementById("adminCommunities");
let productBox = document.getElementById("adminProducts");



if(userBox){

let username = localStorage.getItem("username");
let email = localStorage.getItem("email");


if(username){

userBox.innerHTML =
username + "<br>" + email;

}

else{

userBox.innerHTML =
"Geen gebruikers";

}

}




if(communityBox){

let communities =
JSON.parse(localStorage.getItem("communities")) || [];


communityBox.innerHTML="";


communities.forEach(function(c){

communityBox.innerHTML +=
"🌍 " + c.name + "<br>";

});

}




if(productBox){

let products =
JSON.parse(localStorage.getItem("products")) || [];


productBox.innerHTML="";


products.forEach(function(p){

productBox.innerHTML +=
"🛒 " + p.name + "<br>";

});

}


}


window.addEventListener("load",loadAdminLists);
function adminLoad(){


let communities =
JSON.parse(localStorage.getItem("communities")) || [];


let products =
JSON.parse(localStorage.getItem("products")) || [];



let cBox=document.getElementById("adminCommunities");

let pBox=document.getElementById("adminProducts");



if(cBox){

cBox.innerHTML="";


communities.forEach(function(c,index){

cBox.innerHTML += `

<p>
🌍 ${c.name}

<button onclick="deleteCommunity(${index})">
❌
</button>

</p>

`;

});

}



if(pBox){

pBox.innerHTML="";


products.forEach(function(p,index){

pBox.innerHTML += `

<p>
🛒 ${p.name}

<button onclick="deleteProduct(${index})">
❌
</button>

</p>

`;

});


}

}




function deleteCommunity(index){

let communities =
JSON.parse(localStorage.getItem("communities")) || [];


communities.splice(index,1);


localStorage.setItem(
"communities",
JSON.stringify(communities)
);


adminLoad();

}




function deleteProduct(index){

let products =
JSON.parse(localStorage.getItem("products")) || [];


products.splice(index,1);


localStorage.setItem(
"products",
JSON.stringify(products)
);


adminLoad();

}



window.addEventListener("load",adminLoad);
function checkout(product){

localStorage.setItem(
"checkoutProduct",
JSON.stringify(product)
);


window.location.href="checkout.html";

}