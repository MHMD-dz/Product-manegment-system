let price = document.getElementsByClassName("price")[0];
let tax = document.getElementsByClassName("tax")[0];
let ads = document.getElementsByClassName("ads")[0];
let discount = document.getElementsByClassName("disco")[0];
let total = document.getElementsByClassName('totall')[0] ;
let cat = document.getElementsByClassName('cat')[0];
let count = document.getElementsByClassName('count')[0]
let titel = document.getElementsByClassName('titel')[0];
let buttn = document.getElementsByClassName('creat')[0];



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
        id : arrProduct.length + 1  ,
        titel: titel.value,
        price: price.value,
        tax : tax.value,
        ads : ads.value,
        discount : discount.value,
        total: result,
        cat: cat.value,
        count : count.value
        }
        arrProduct.push(prod);
        clearData();
        showData();

        localStorage.setItem("product",JSON.stringify(arrProduct))
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

onload = function hello() {
    showData();
} 

function showData() {
    let table = '' ;
    for (let i = 0; i < arrProduct.length; i++) {
        table += `<tr>
                        <td class="id">${arrProduct[i].id}</td>
                        <td class="titel">${arrProduct[i].titel}</td>
                        <td class="price">${arrProduct[i].price}</td>
                        <td class="tax">${arrProduct[i].tax}</td>
                        <td class="ads">${arrProduct[i].ads}</td>
                        <td class="total">${arrProduct[i].total}</td>
                        <td class="disco">${arrProduct[i].discount}</td>
                        <td class="cat">${arrProduct[i].cat}</td>
                        <td><button class="update">Update</button></td>
                        <td><button class="delete" onclick='deleteProduct(${i})'>Delete</button></td>
                </tr>`;
        tbody.innerHTML = table ;
    }
}

// delete item

function deleteProduct(i) {
    arrProduct.splice(i,1);
    localStorage.product = JSON.stringify(arrProduct) ;
    showData();
}