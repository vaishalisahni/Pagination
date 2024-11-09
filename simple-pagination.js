const container=document.querySelector(".page-container");
const content=document.querySelector(".content");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
// console.log(sampleRecipesData);
let recipesArray=[];
let page=1;
let pages=[];
let pageSize=5;
let totalDataSize=0;
let totalPagecount=0;


function fetchData(){
    fetch('https://dummyjson.com/recipes?limit=1000')
    .then(res => res.json())
    .then(data=>setDetails(data));
    // setDetails(sampleRecipesData);
}
function setDetails(data){
    recipesArray=data.recipes;
    totalDataSize=recipesArray.length;
    totalPagecount=Math.ceil(totalDataSize/pageSize);
    // updateActive();
    showData();
    addPagination();
}
function showData(data){
    content.innerHTML="";
    const recipes=data?data:recipesArray;
    let newData=recipes.slice(pageSize * (page -1), pageSize * page );
    pushCards(newData);
    updateActive();
    updateTruncation();
}
function pushCards(data){
    data.forEach(item=>{
        const card=document.createElement('div');
        card.classList.add('card');
        
        const imgContainer=document.createElement('div');
        const image=document.createElement('img');
        image.src=item.image;
        image.alt="recipe-image";
        imgContainer.classList.add('image-container');
        image.classList.add('image');
        imgContainer.append(image);

        const title=document.createElement('h2');
        title.classList.add("title");
        title.innerText=item.name;

        const propertyContainer=document.createElement('div');
        propertyContainer.classList.add('properties-container');
        const propertyList=document.createElement('ul');
        propertyList.classList.add('property-list');

        const preptime=document.createElement('li');
        const cookingTime=document.createElement('li');
        const servings=document.createElement('li');
        const difficulty=document.createElement('li');
        const cuisine=document.createElement('li');
        const calories=document.createElement('li');
        const tags=document.createElement('li');
        const userId=document.createElement('li');
        const rating=document.createElement('li');
        const reviewCount=document.createElement('li');
        const mealType=document.createElement('li');

        preptime.innerText="prepTimeMinutes: "+item.prepTimeMinutes;
        preptime.classList.add('property');
        cookingTime.innerText="cookTimeMinutes: " +item.cookTimeMinutes;
        cookingTime.classList.add('property');
        servings.innerText="servings: " +item.servings;
        servings.classList.add('property');
        difficulty.innerText="difficulty: " +item.difficulty;
        difficulty.classList.add('property');
        cuisine.innerText="cuisine: " +item.cuisine;
        cuisine.classList.add('property');
        calories.innerText="calories: " +item.calories;
        calories.classList.add('property');
        tags.innerText="tags: " +item.tags.join(', ');
        tags.classList.add('property');
        userId.innerText="userId: " +item.userId;
        userId.classList.add('property');
        rating.innerText="rating: " +item.rating;
        rating.classList.add('property');
        reviewCount.innerText="reviewCount: "+item.reviewCount;
        reviewCount.classList.add('property');
        mealType.innerText="mealType: " +item.mealType;
        mealType.classList.add('property');

        propertyList.append(preptime,cookingTime,servings,difficulty,cuisine,calories,tags,userId,rating,reviewCount,mealType);
        propertyContainer.append(propertyList);

        const ingContainer=document.createElement('div');
        ingContainer.classList.add('ingredients-container');
        const ingHead=document.createElement('h3');
        ingHead.classList.add('ingredient-title');
        const ingList=document.createElement('ul');
        ingList.classList.add('ingredient-list');

        ingHead.innerText="Ingredients";

        item.ingredients.forEach(a=>{
            const liItem=document.createElement('li');
            liItem.innerText=a;
            liItem.classList.add('ingredient');
            ingList.append(liItem);

        });
        ingContainer.append(ingHead,ingList);

        const instContainer=document.createElement('div');
        instContainer.classList.add('instructions-container');
        const instHead=document.createElement('h3');
        instHead.classList.add('instructions-title');
        const instList=document.createElement('ol');
        instList.classList.add('instruction-list');

        instHead.innerText="Instructions";

        item.instructions.forEach(a=>{
            const liItem=document.createElement('li');
            liItem.innerText=a;
            liItem.classList.add('instruction');
            instList.append(liItem);

        });
        instContainer.append(instHead,instList);

        card.append(imgContainer,title,propertyContainer,ingContainer,instContainer);
        content.append(card);
    });
}
function addPagination(){
    // container.innerHtml="";
    for(let i=1;i<=totalPagecount;i++){
        const newpage= document.createElement("button");
        newpage.classList.add("btn");
        newpage.innerText=i;
        container.append(newpage);
        pages.push(newpage);
        // pages=[...pages,newpage]; //new array is created
    }
    addEventListeners();
    updateActive();
    updateTruncation();
}
function addEventListeners(){
    pages.forEach(btn=>{
        btn.addEventListener("click",(e)=>{
            page=Number(btn.innerText);
            showData();
            // updateActive();
        });
    });
    prev.addEventListener("click",(e)=>{
        if(page>1)page--;
        showData();
        // updateActive();
    });
    next.addEventListener("click",(e)=>{
        if(page<totalPagecount) page++;
        showData();
        // updateActive();
    });

}
function updateActive(){
    if(page==1) prev.style.visibility="hidden";
    else prev.style.visibility="visible";
    if(page==totalPagecount) next.style.visibility="hidden";
    else next.style.visibility="visible";
    pages.forEach((btn)=>{
    if(page === Number(btn.innerText))
        btn.classList.add("active");
    else
        btn.classList.remove("active");
    })
}
function updateTruncation(){
    pages.forEach(btn=>{
        let num=Number(btn.innerText);
        let shouldTruncate=(num>2) && (num< page-1 || num>page+1) && (num<totalPagecount-1);
        let shouldNotTruncate=((page<5 && num<=5 ) || (page > totalPagecount-4 && num>=totalPagecount-4));

        if(page>4) pages[1].classList.add("truncated");
        else pages[1].classList.remove("truncated");

        if(page<totalPagecount-3) pages[totalPagecount-2].classList.add("truncated");
        else pages[totalPagecount-2].classList.remove("truncated");

        if(shouldTruncate && !shouldNotTruncate) btn.style.display="none";
        else btn.style.display="block";
    })
}
function runApp(){
    fetchData();
}
runApp();
