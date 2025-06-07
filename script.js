let price = document.getElementsByClassName("price")[0];
let tax = document.getElementsByClassName("tax")[0];
let ads = document.getElementsByClassName("ads")[0];
let discount = document.getElementsByClassName("disco")[0];
let total = 0 ;

function calcul() {
    let p = Number(price.value) || 0;
    let t = Number(tax.value) || 0;
    let a = Number(ads.value) || 0;
    let d = (Number(discount.value)*p/100) || 0;
    total = p + t + a - d;
    document.getElementsByClassName('totall')[0].textContent = total.toFixed(2);
}
[price, tax, ads, discount].forEach(input => {
    input.addEventListener('input', calcul);
});