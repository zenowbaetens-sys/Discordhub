// DiscordHub - Complete script
// Deel 1: Firebase gebruikers systeem


// ==============================
// REGISTER
// ==============================

async function register(){

    let username = document.getElementById("username")?.value;
    let email = document.getElementById("email")?.value;
    let password = document.getElementById("password")?.value;


    if(!username || !email || !password){

        alert("Vul alles in!");
        return;

    }


    try{


        let userCredential = await auth.createUserWithEmailAndPassword(
            email,
            password
        );


        let user = userCredential.user;


        await user.updateProfile({

            displayName: username

        });


        await db.collection("users").doc(user.uid).set({

            username: username,
            email: email,
            role: "gebruiker",
            created: new Date()

        });



        alert("Account succesvol gemaakt!");

        window.location.href="dashboard.html";


    }

    catch(error){

        alert(error.message);

    }


}



// ==============================
// LOGIN
// ==============================

async function login(){


    let email = document.getElementById("loginEmail")?.value;
    let password = document.getElementById("loginPassword")?.value;


    if(!email || !password){

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



// ==============================
// GOOGLE LOGIN
// ==============================

function googleLogin(){


    let provider = new firebase.auth.GoogleAuthProvider();


    auth.signInWithPopup(provider)

    .then(async(result)=>{


        let user = result.user;


        await db.collection("users").doc(user.uid).set({

            username:user.displayName,
            email:user.email,
            role:"gebruiker",
            created:new Date()

        }, {merge:true});



        localStorage.setItem(
            "email",
            user.email
        );


        localStorage.setItem(
            "username",
            user.displayName
        );



        window.location.href="dashboard.html";


    })


    .catch(error=>{


        alert(error.message);


    });


}




// ==============================
// LOGOUT
// ==============================


function logout(){


    auth.signOut().then(()=>{


        localStorage.clear();


        window.location.href="index.html";


    });


}
// ==============================
// COMMUNITIES
// ==============================


async function addCommunity(){


    let name = document.getElementById("communityName")?.value;
    let category = document.getElementById("communityCategory")?.value;
    let desc = document.getElementById("communityDesc")?.value;



    if(!name || !category || !desc){

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


    let box = document.getElementById("newCommunities");


    if(!box){

        return;

    }



    db.collection("communities")
    .orderBy("created","desc")
    .onSnapshot(snapshot=>{


        box.innerHTML="";



        snapshot.forEach(doc=>{


            let community = doc.data();



            box.innerHTML += `

            <div class="card community">


            <h3>🌍 ${community.name}</h3>


            <p>${community.desc}</p>


            <p>
            Categorie: ${community.category}
            </p>



            <button class="btn" 
            onclick="openCommunity('${doc.id}')">

            Bekijk

            </button>


            </div>

            `;


        });


    });


}





function openCommunity(id){


    localStorage.setItem(
        "selectedCommunity",
        id
    );


    window.location.href="community.html";


}





function searchCommunity(){


    let input =
    document.getElementById("search")?.value.toLowerCase();



    let cards =
    document.getElementsByClassName("community");



    for(let i=0;i<cards.length;i++){


        let text =
        cards[i].innerText.toLowerCase();



        if(text.includes(input)){


            cards[i].style.display="block";


        }

        else{


            cards[i].style.display="none";


        }


    }


}
// ==============================
// PARTNERS
// ==============================


function addPartner(){


    let name = document.getElementById("partnerName")?.value;
    let owner = document.getElementById("partnerOwner")?.value;
    let desc = document.getElementById("partnerDesc")?.value;



    if(!name || !owner || !desc){

        alert("Vul alles in!");

        return;

    }



    let partners =
    JSON.parse(localStorage.getItem("partners")) || [];



    partners.push({

        name:name,
        owner:owner,
        desc:desc,
        status:"pending"

    });



    localStorage.setItem(
        "partners",
        JSON.stringify(partners)
    );



    alert("Partner aanvraag verstuurd!");

    loadPartners();


}





function loadPartners(){


    let box =
    document.getElementById("partnerList");



    if(!box){

        return;

    }



    let partners =
    JSON.parse(localStorage.getItem("partners")) || [];



    box.innerHTML="";



    partners.forEach(partner=>{


        box.innerHTML += `

        <div class="card">

        <h3>🤝 ${partner.name}</h3>

        <p>${partner.desc}</p>

        <p>Eigenaar: ${partner.owner}</p>

        <p>Status: ${partner.status}</p>

        </div>

        `;


    });


}





// ==============================
// ADMIN PARTNERS
// ==============================


function loadAdminPartners(){


    let box =
    document.getElementById("adminPartners");



    if(!box){

        return;

    }



    let partners =
    JSON.parse(localStorage.getItem("partners")) || [];



    box.innerHTML="";



    partners.forEach((partner,index)=>{


        box.innerHTML += `


        <div class="card">


        <h3>${partner.name}</h3>


        <p>${partner.owner}</p>


        <button class="btn"
        onclick="approvePartner(${index})">

        Goedkeuren

        </button>


        <button class="btn second"
        onclick="removePartner(${index})">

        Verwijderen

        </button>


        </div>


        `;


    });


}





function approvePartner(index){


    let partners =
    JSON.parse(localStorage.getItem("partners")) || [];



    partners[index].status="approved";



    localStorage.setItem(
        "partners",
        JSON.stringify(partners)
    );



    loadAdminPartners();


}





function removePartner(index){


    let partners =
    JSON.parse(localStorage.getItem("partners")) || [];



    partners.splice(index,1);



    localStorage.setItem(
        "partners",
        JSON.stringify(partners)
    );



    loadAdminPartners();


}
// ==============================
// MARKETPLACE
// ==============================


async function addProduct(){


    let name =
    document.getElementById("productName")?.value;


    let price =
    document.getElementById("productPrice")?.value;


    let type =
    document.getElementById("productType")?.value;


    let desc =
    document.getElementById("productDesc")?.value;



    if(!name || !price || !type || !desc){

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


    let box =
    document.getElementById("productList");



    if(!box){

        return;

    }



    db.collection("products")
    .onSnapshot(snapshot=>{


        box.innerHTML="";



        snapshot.forEach(doc=>{


            let product = doc.data();



            box.innerHTML += `


            <div class="card">


            <h3>🛒 ${product.name}</h3>


            <p>${product.desc}</p>


            <p>
            Type: ${product.type}
            </p>


            <p>
            Prijs: €${product.price}
            </p>



            <button class="btn"
            onclick='checkout(${JSON.stringify(product)})'>

            Kopen

            </button>


            </div>


            `;


        });


    });


}





// ==============================
// WINKELWAGEN
// ==============================


function addToCart(product){


    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];



    cart.push(product);



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    alert("Toegevoegd aan winkelwagen!");

}





function loadCart(){


    let box =
    document.getElementById("cartList");



    if(!box){

        return;

    }



    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];



    box.innerHTML="";



    let total=0;



    cart.forEach(product=>{


        total += Number(product.price);



        box.innerHTML += `


        <div class="card">


        <h3>${product.name}</h3>


        <p>€${product.price}</p>


        </div>


        `;


    });



    let totalBox =
    document.getElementById("total");


    if(totalBox){

        totalBox.innerHTML =
        "Totaal: €" + total;

    }


}





function checkout(product){


    localStorage.setItem(
        "checkoutProduct",
        JSON.stringify(product)
    );



    window.location.href="checkout.html";


}
// ==============================
// ADMIN
// ==============================


function loadAdminStats(){


    let users =
    JSON.parse(localStorage.getItem("users")) || [];



    let communities =
    document.getElementById("communityCount");

    let products =
    document.getElementById("productCount");

    let usersBox =
    document.getElementById("usersCount");



    if(usersBox){

        usersBox.innerHTML = users.length;

    }



    if(communities){

        db.collection("communities")
        .get()
        .then(snapshot=>{

            communities.innerHTML =
            snapshot.size;

        });

    }



    if(products){

        db.collection("products")
        .get()
        .then(snapshot=>{

            products.innerHTML =
            snapshot.size;

        });

    }


}





function loadAdminLists(){


    let userBox =
    document.getElementById("adminUsers");



    if(userBox){


        let email =
        localStorage.getItem("email");


        let username =
        localStorage.getItem("username");



        if(email){


            userBox.innerHTML =

            username +
            "<br>" +
            email;


        }

        else{


            userBox.innerHTML =
            "Geen gebruikers";


        }


    }


}





// ==============================
// START ALLES
// ==============================


window.addEventListener("load",()=>{


    loadCommunities();

    loadPartners();

    loadAdminPartners();

    loadProducts();

    loadCart();

    loadAdminStats();

    loadAdminLists();


});