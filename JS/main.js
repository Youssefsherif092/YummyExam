let row = document.getElementById("row")
let searchRow = document.getElementById("search-row")
let categoriesRow = document.getElementById("categoriesRow")
let areaRow = document.getElementById("areaRow")
let ingredientsRow = document.getElementById("ingredientsRow")
let byName = document.getElementById("byName")
let byLetter = document.getElementById("byLetter")
let nameForm = document.getElementById("nameForm")
let ageForm = document.getElementById("ageForm")
let emailForm = document.getElementById("emailForm")
let phoneForm = document.getElementById("phoneForm")
let passForm = document.getElementById("passForm")
let rePassForm = document.getElementById("rePassForm")
let btnEnabled = document.getElementById("btn-enabled")
let btnDisabled = document.getElementById("btn-disabled")
let mainRow = document.getElementById("mainRow");
let ingredients = document.querySelector(".ingredients");
let switch1 = 0;
let switch2 = 0;
let switch3 = 0;
let switch4 = 0;
let switch5 = 0;
let switch6 = 0;

jQuery(document).ready(function() {
    jQuery('#loading').fadeOut(3000);
});

nameForm.addEventListener("input",function(){

        switch6 = 1;

    validate()

})

ageForm.addEventListener("input",function(){
    if(ageForm.value > 99){
        $("#ageAlert").css({display:"block"})
        switch1 = 0;
    }
    else{
        $("#ageAlert").css({display:"none"})
        switch1 = 1;
    }
    validate()

})

emailForm.addEventListener("input",function(){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailForm.value))
    {
        $("#mailAlert").css({display:"none"})
        switch2 = 1;
    }
    else{
        switch2 = 0;
        $("#mailAlert").css({display:"block"})

    }
    validate()

})

phoneForm.addEventListener("input",function(){
    if(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(phoneForm.value))
    {
        $("#numberAlert").css({display:"none"})
        switch3 = 1;
    }
    else{
        switch3 = 0;
        $("#numberAlert").css({display:"block"})

    }
    validate()

})

passForm.addEventListener("input",function(){
    if(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(passForm.value))
    {
        $("#passAlert").css({display:"none"})
        switch4 = 1;
    }
    else{
        switch4 = 0;
        $("#passAlert").css({display:"block"})

    }
    validate()

})

rePassForm.addEventListener("input",function(){
    if(rePassForm.value == passForm.value)
    {
        $("#rePassAlert").css({display:"none"})
        switch5 = 1;
    }
    else{
        switch5 = 0;
        $("#rePassAlert").css({display:"block"})

    }
    validate()
})

function validate(){
    if((switch1 + switch2 + switch3 + switch4 + switch5 + switch6) == 6){
        $("#btn-enabled").css({display:"block"})
        $("#btn-disabled").css({display:"none"})
        console.log("working?");
    }
    else{
        $("#btn-enabled").css({display:"none"})
        $("#btn-disabled").css({display:"block"})
    }
    console.log(switch1+switch2+switch3+switch4+switch5+switch6);
}

async function getData() {
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let res = await url.json();
    return res
}

async function display(){
    let box = ``;
    let data = await getData();
    for(let i=0;i<data.meals.length;i++){
        box += `
        <div class="col-md-3">
        <div class="contain main" onclick="displaymeal('${data.meals[i].strMeal}')">
            <img src="${data.meals[i].strMealThumb}" alt="" class="rounded rounded-3 w-100">
            <div class="overlay rounded-3  d-flex flex-column justify-content-center fw-bold fs-3">${data.meals[i].strMeal}</div>
        </div>
    </div>
        `
    }
    row.innerHTML = box;
}

display();

async function displaymeal(mealName){
    console.log(mealName);
    $("#home").css({display:"none"})
    $("#search").css({display:"none"})
    $("#categories").css({display:"none"})
    $("#area").css({display:"none"})
    $("#ingredients").css({display:"none"})
    $("#contact").css({display:"none"})
    $("#main").css({display:"block"})
    let box = ``;
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    let res = await url.json();
    console.log(res);
    function ingredients(){
        var newBox = ``;
        for (let i = 1; i <= 20; i++) {
            let currentIngredient = "strIngredient" + i;
            console.log(currentIngredient);
            newBox += `<div class="alert alert-info m-2 p-1">${res.meals[0][`strMeasure${i}`]} ${res.meals[0][`strIngredient${i}`]}</div>`
            console.log(newBox);

          }
          return newBox
    }

    box = `
    <div class="col-md-4">
    <img src="${res.meals[0].strMealThumb}" alt="" class="w-100 rounded-3">
    <h2 class="text-white">${res.meals[0].strMeal}</h2>
</div>
<div class="col-md-8">
    <h3 class="text-white ">Instructions</h3>
    <p class="text-white">${res.meals[0].strInstructions}</p>
    <h4 class="text-white fw-bold">Area: <span class="fw-normal ">${res.meals[0].strArea}</span></h4>
    <h4 class="text-white fw-bold">Category: <span class="fw-normal ">${res.meals[0].strCategory}</span></h4>
    <h4 class="text-white fw-bold">Recipes:</h4>
    <div class="ingredients d-flex flex-wrap ">
    ${    ingredients()}
    </div>
    <h4 class="text-white fw-bold">Tags:</h4>
    <div class="tags">
        <div class="alert alert-danger  m-2 p-1">${res.meals[0].strTags}</div>
    </div>
    <div class="btns">
        <a class="btn btn-success" target=”_blank” href="${res.meals[0].strSource}">Source</a>
        <a class="btn btn-danger" target=”_blank” href="${res.meals[0].strYoutube}">Watch</a>
    </div>
</div>
    `
    mainRow.innerHTML = box;

}


async function categoriesList(){
    let box = ``;
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let res = await url.json();
    for(let i=0;i<res.categories.length;i++){
        box += `
        <div class="col-md-3">
        <div class="contain">
            <img src="${res.categories[i].strCategoryThumb}" alt="" class="rounded rounded-3 w-100">
            <div class="overlay rounded-3  d-flex flex-column justify-content-center fw-bold fs-3" onclick="categoriesContain('${res.categories[i].strCategory}')">${res.categories[i].strCategory}</div>
        </div>
    </div>
        `
    }
    categoriesRow.innerHTML = box;
}
async function areaList(){
    let box = ``;
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let res = await url.json();
    for(let i=0;i<res.meals.length;i++){
        box += `
        <div class="col-md-3">
        <div class="contain d-flex flex-column justify-content-center align-items-center "  onclick="areaContain('${res.meals[i].strArea}')">
            <i class="fa-solid fa-house fs-3 text-white"></i>
            <div class="rounded-3  d-flex flex-column justify-content-center fw-bold fs-3 text-white ">${res.meals[i].strArea}</div>
        </div>
    </div>
        `
    }
    areaRow.innerHTML = box;
}

async function areaContain(area){
    let box = ``;
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let res = await url.json();
    for(let i=0;i<res.meals.length;i++){
        box += `
        <div class="col-md-3">
        <div class="contain main" onclick="displaymeal('${res.meals[i].strMeal}')">
            <img src="${res.meals[i].strMealThumb}" alt="" class="rounded rounded-3 w-100">
            <div class="overlay rounded-3  d-flex flex-column justify-content-center fw-bold fs-3">${res.meals[i].strMeal}</div>
        </div>
    </div>
        `
    }
    areaRow.innerHTML = box;
}

async function categoriesContain(category){
    let box = ``;
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let res = await url.json();
    for(let i=0;i<res.meals.length;i++){
        box += `
        <div class="col-md-3">
        <div class="contain main" onclick="displaymeal('${res.meals[i].strMeal}')">
            <img src="${res.meals[i].strMealThumb}" alt="" class="rounded rounded-3 w-100">
            <div class="overlay rounded-3  d-flex flex-column justify-content-center fw-bold fs-3">${res.meals[i].strMeal}</div>
        </div>
    </div>
        `
    }
    categoriesRow.innerHTML = box;
}

async function ingredientsList(){
    let box = ``;
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let res = await url.json();
    for(let i=0;i<res.meals.length;i++){
        let str = res.meals[i].strDescription;
        if(str != null){
            var newStr = str.slice(0,114);
            
        }
        box += `
        <div class="col-md-3">
        <div class="contain d-flex flex-column justify-content-center align-items-center "  onclick="ingredientContain('${res.meals[i].strIngredient}')">
            <i class="fa-solid fa-drumstick-bite fs-3 text-white"></i>
            <div class="rounded-3  d-flex flex-column justify-content-center fw-bold fs-3 text-white ">${res.meals[i].strIngredient}</div>
            <p class=" text-white fw-medium ">${newStr}</p>
        </div>
    </div>
        `
        
    }
    ingredientsRow.innerHTML = box;
}

async function ingredientContain(ingredient){
    let box = ``;
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let res = await url.json();
    for(let i=0;i<res.meals.length;i++){
        box += `
        <div class="col-md-3">
        <div class="contain main" onclick="displaymeal('${res.meals[i].strMeal}')">
            <img src="${res.meals[i].strMealThumb}" alt="" class="rounded rounded-3 w-100">
            <div class="overlay rounded-3  d-flex flex-column justify-content-center fw-bold fs-3">${res.meals[i].strMeal}</div>
        </div>
    </div>
        `
    }
    ingredientsRow.innerHTML = box;
}

$(".icon-contain").click(function(){
        $(".main-section").toggle(
            function(){
                $("aside").animate({left: '-250px'})
            },
            function(){
                $("aside").animate({left: '0'})
            }
        )
        $(".list-item").slideToggle(800);
        $("#bars").toggle();
        $("#x-mark").toggle();
})

$("#searchItem").click(
    function(){
        $("#home").css({display:"none"})
        $("#search").css({display:"block"})
        $("#categories").css({display:"none"})
        $("#area").css({display:"none"})
        $("#ingredients").css({display:"none"})
        $("#contact").css({display:"none"})
        $("#main").css({display:"none"})
    }
)

$("#homeItem").click(
    function(){
        $("#home").css({display:"block"})
        $("#search").css({display:"none"})
        $("#categories").css({display:"none"})
        $("#area").css({display:"none"})
        $("#ingredients").css({display:"none"})
        $("#contact").css({display:"none"})
        $("#main").css({display:"none"})

    }
)

$("#categoriesItem").click(
    function(){
        categoriesList();
        $("#home").css({display:"none"})
        $("#search").css({display:"none"})
        $("#categories").css({display:"block"})
        $("#area").css({display:"none"})
        $("#ingredients").css({display:"none"})
        $("#contact").css({display:"none"})
        $("#main").css({display:"none"})

    }
)
$("#areaItem").click(
    function(){
        areaList();
        $("#home").css({display:"none"})
        $("#search").css({display:"none"})
        $("#categories").css({display:"none"})
        $("#area").css({display:"block"})
        $("#ingredients").css({display:"none"})
        $("#contact").css({display:"none"})
        $("#main").css({display:"none"})

    }
)

$("#ingredientsItem").click(
    function(){
        ingredientsList();
        $("#home").css({display:"none"})
        $("#search").css({display:"none"})
        $("#categories").css({display:"none"})
        $("#area").css({display:"none"})
        $("#ingredients").css({display:"block"})
        $("#contact").css({display:"none"})
        $("#main").css({display:"none"})

    }
)

$("#contactItem").click(
    function(){
        $("#home").css({display:"none"})
        $("#search").css({display:"none"})
        $("#categories").css({display:"none"})
        $("#area").css({display:"none"})
        $("#ingredients").css({display:"none"})
        $("#contact").css({display:"block"})
        $("#main").css({display:"none"})

    }
)

byName.addEventListener("input",async function searchByName(){
    let box = ``;
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${byName.value}`)
    let res = await url.json();
    for(let i=0;i<res.meals.length;i++){
        box += `
        <div class="col-md-3">
        <div class="contain main" onclick="displaymeal('${res.meals[i].strMeal}')">
            <img src="${res.meals[i].strMealThumb}" alt="" class="rounded rounded-3 w-100">
            <div class="overlay rounded-3  d-flex flex-column justify-content-center fw-bold fs-3">${res.meals[i].strMeal}</div>
        </div>
    </div>
        `
    }
    searchRow.innerHTML = box;
})

byLetter.addEventListener("input",async function searchByLetter(){
    let box = ``;
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${byLetter.value}`)
    let res = await url.json();
    for(let i=0;i<res.meals.length;i++){
        box += `
        <div class="col-md-3">
        <div class="contain main" onclick="displaymeal('${res.meals[i].strMeal}')">
            <img src="${res.meals[i].strMealThumb}" alt="" class="rounded rounded-3 w-100">
            <div class="overlay rounded-3  d-flex flex-column justify-content-center fw-bold fs-3">${res.meals[i].strMeal}</div>
        </div>
    </div>
        `
    }
    searchRow.innerHTML = box;
})

