let price = document.getElementsByClassName("price")[0];
let tax = document.getElementsByClassName("tax")[0];
let ads = document.getElementsByClassName("ads")[0];
let discount = document.getElementsByClassName("disco")[0];
let total = document.getElementsByClassName('totall')[0] ;
let cat = document.getElementsByClassName('cat')[0];
let count = document.getElementsByClassName('count')[0]
let titel = document.getElementsByClassName('titel')[0];
let buttn = document.getElementsByClassName('creat')[0];
let mode = 'create' ;
let temp ;


// calcul the total

let result = 0 ;
function calcul() {
    if(price.value != '' ){
        let p = Number(price.value) || 0;
        let t = Number(tax.value) || 0;
        let a = Number(ads.value) || 0;
        let d = (Number(discount.value)*p/100) || 0;
        result = p + t + a - d;
        total.textContent = result.toFixed(2);
        total.parentElement.style.backgroundColor = 'green' ;
    }else{
        total.textContent = 0;
        total.parentElement.style.backgroundColor = 'red' ;
    }
}
[price, tax, ads, discount].forEach(input => {
    input.addEventListener('input', calcul);
});



// create product
let arrProduct = [] ;

buttn.onclick = function createe() {
    if( titel.value != '' && count.value >= 1  && cat.value !='' && result > 0){
        let prod = {
        titel: titel.value.toLowerCase() ,
        price: price.value,
        tax : tax.value,
        ads : ads.value,
        discount : discount.value,
        total: result,
        cat: cat.value.toLowerCase() ,
        count : count.value
        };
        // multiplt create
        if (mode === 'create') {
            if (count.value > 1) {
                for (let lol = 0; lol < Number(count.value); lol++) {
                    arrProduct.push(prod);
                }
            }else{
            arrProduct.push(prod);
        }
        }else{
            arrProduct[temp] = prod ;
            mode = 'create'
            count.style.display = 'block';
            buttn.textContent = 'CREATE';
        }
        
        clearData();
        showData();

        localStorage.setItem("product",JSON.stringify(arrProduct));
        
    }

    
}

// save to local storage
if (localStorage.getItem('product') != null) {
    arrProduct = JSON.parse(localStorage.product);
    }

    
// clear data
function clearData() {
    titel.value = '' ;
    price.value = '' ;
    count.value = '' ;
    cat.value = '' ;
    result = 0 ;
    total.textContent = 0;
    ads.value = '' ;
    tax.value = '' ;
    discount.value = '';
    total.parentElement.style.backgroundColor = 'red' ;
}

// raed data
let tbody = document.getElementsByClassName('tbody')[0];

window.onload = showData;


function showData() {
    let table = '' ;
    for (let i = 0; i < arrProduct.length; i++) {
        table += `<tr>
                        <td class="id">${i+1}</td>
                        <td class="titel">${arrProduct[i].titel}</td>
                        <td class="price">${arrProduct[i].price}</td>
                        <td class="tax">${arrProduct[i].tax}</td>
                        <td class="ads">${arrProduct[i].ads}</td>
                        <td class="disco">${arrProduct[i].discount}</td>
                        <td class="total">${arrProduct[i].total}</td>
                        <td class="cat">${arrProduct[i].cat}</td>
                        <td><button class="update" onclick='updateProduct(${i})'>Update</button></td>
                        <td><button class="delete" onclick='deleteProduct(${i})'>Delete</button></td>
                </tr>`;
        
    }tbody.innerHTML = table ;
    // Show/hide deleteAll button
    let deleteAllBtn = document.getElementsByClassName('deleteAll')[0];
    if (arrProduct.length > 0) {
        deleteAllBtn.style.display = "block";
        deleteAllBtn.textContent = `Delete All (${arrProduct.length})`;
    } else {
        deleteAllBtn.style.display = "none";
    }
}

// delete item

function deleteProduct(i) {
    arrProduct.splice(i,1);
    localStorage.product = JSON.stringify(arrProduct) ;
    showData();
}


// delete all 

function deleteAll() {
    localStorage.removeItem("product");
    arrProduct.splice(0);
    showData();
}

// Update product 

function updateProduct(i) {
    titel.value = arrProduct[i].titel ;
    price.value = arrProduct[i].price ;
    count.value = arrProduct[i].count ;
    cat.value = arrProduct[i].cat ;
    total.textContent = arrProduct[i].total ;
    ads.value = arrProduct[i].ads ;
    tax.value = arrProduct[i].tax ;
    discount.value = arrProduct[i].discount ;
    count.style.display = 'none';
    buttn.textContent = 'UPDATE';
    mode = 'update';
    calcul();
    temp = i ;
    scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// search 
let searchMod = 'titel';
let search = document.getElementsByClassName('search')[0];

function searchMode(id) {
    if (id == 1) {
        searchMod = 'titel';
        search.placeholder = "Search by Title";
        search.value = '' ;
        showData();
    }else{
        searchMod = 'cat';
        search.placeholder = "Search by Category";
        search.value = '' ;
        showData();
    }

    search.focus();
}


function searchData( valuee ) {
    valuee = valuee.toLowerCase();
    if (searchMod == 'titel') {
        table = '' ;
        for (let i = 0; i < arrProduct.length; i++) {
            if (arrProduct[i].titel.includes(valuee)) {
                table += `<tr>
                        <td class="id">${i+1}</td>
                        <td class="titel">${arrProduct[i].titel}</td>
                        <td class="price">${arrProduct[i].price}</td>
                        <td class="tax">${arrProduct[i].tax}</td>
                        <td class="ads">${arrProduct[i].ads}</td>
                        <td class="disco">${arrProduct[i].discount}</td>
                        <td class="total">${arrProduct[i].total}</td>
                        <td class="cat">${arrProduct[i].cat}</td>
                        <td><button class="update" onclick='updateProduct(${i})'>Update</button></td>
                        <td><button class="delete" onclick='deleteProduct(${i})'>Delete</button></td>
                </tr>`;
                
            }
        }
    }else{
        table = '' ;
        for (let i = 0; i < arrProduct.length; i++) {
            if (arrProduct[i].cat.includes(valuee)) {
                table += `<tr>
                        <td class="id">${i+1}</td>
                        <td class="titel">${arrProduct[i].titel}</td>
                        <td class="price">${arrProduct[i].price}</td>
                        <td class="tax">${arrProduct[i].tax}</td>
                        <td class="ads">${arrProduct[i].ads}</td>
                        <td class="disco">${arrProduct[i].discount}</td>
                        <td class="total">${arrProduct[i].total}</td>
                        <td class="cat">${arrProduct[i].cat}</td>
                        <td><button class="update" onclick='updateProduct(${i})'>Update</button></td>
                        <td><button class="delete" onclick='deleteProduct(${i})'>Delete</button></td>
                </tr>`;
                
            }
        }
    }
    tbody.innerHTML = table ;

}