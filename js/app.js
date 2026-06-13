let phones = [];
let list = false;

fetch("https://phonehub-api-production.up.railway.app/api/phones")
.then(response => response.json())
.then(data => {

    phones = data;

    render();

})
.catch(error => {

    console.error("JSON Error:", error);

});

function render(){

    let data = [...phones];

    const search =
        document.getElementById("search")
        .value
        .toLowerCase();

    const brand =
        document.getElementById("brandFilter")
        .value;

    const sort =
        document.getElementById("sortPrice")
        .value;

    data = data.filter(phone =>
        phone.name.toLowerCase().includes(search) &&
        (!brand || phone.brand === brand)
    );

    if(sort === "asc"){
        data.sort((a,b)=>a.price-b.price);
    }

    if(sort === "desc"){
        data.sort((a,b)=>b.price-a.price);
    }

    const container =
        document.getElementById("products");

    container.className =
        (list ? "list-view " : "")
        + "row g-3";

    container.innerHTML = data.map(phone => `
    
        <div class="${list ? 'col-12' : 'col-md-4'}">

            <div class="card h-100">

                <div class="image-box">

                    <img
                        src="${phone.img}"
                        alt="${phone.name}"
                    >

                </div>

                <div class="card-body">

                    <h5>${phone.name}</h5>

                    <p>${phone.brand}</p>

                    <p>
                        Rp ${phone.price.toLocaleString('id-ID')}
                    </p>

                    <button
                        class="btn btn-primary"
                        onclick="detail(${phone.id})">

                        Detail

                    </button>

                </div>

            </div>

        </div>

    `).join("");

}

function detail(id){

    const phone =
        phones.find(p => p.id === id);

    document.getElementById("modalTitle")
        .textContent = phone.name;

    document.getElementById("modalBody")
        .innerHTML = `
        
          <img
        src="${phone.img}"
        class="img-fluid mb-3"
        style="max-height:250px; display:block; margin:auto;"
    >

    <p><b>Merek:</b> ${phone.brand}</p>

    <p>
        <b>Harga:</b>
        Rp ${phone.price.toLocaleString('id-ID')}
    </p>

    <hr>

    <h5>Deskripsi Produk</h5>

    <p>
        ${phone.description || "Deskripsi belum tersedia"}
    </p>
`;

    new bootstrap.Modal(
        document.getElementById("detailModal")
    ).show();

}

function setGrid(){

    list = false;

    render();

}

function setList(){

    list = true;

    render();

}

document.getElementById("search")
.addEventListener("input", render);

document.getElementById("brandFilter")
.addEventListener("change", render);

document.getElementById("sortPrice")
.addEventListener("change", render);

document.getElementById("darkModeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});
