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