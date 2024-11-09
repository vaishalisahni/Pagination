const content=document.querySelector(".content");
const pagination=document.querySelector(".page-container")
let page=0;
let pageSize=8;
let totalDataSize=0;
let totalPagecount=0;
let pages=document.querySelectorAll(".btn");

const prev=document.getElementById("prev");
// const one=document.getElementById("1");
// const two=document.getElementById("2");
// const three=document.getElementById("3");
// const four=document.getElementById("4");
const next=document.getElementById("next");

// const pages=[one,two,three,four];

function fetchData(data){
    // fetch('https://dummyjson.com/recipes?limit=1000')
    // .then(res => res.json())
    // .then(showData);
    showData(data);
}
function showData(data){
    // const recipes=data.recipes;
    const recipes=data;
    totalDataSize=recipes.length;
    totalPagecount=Math.ceil(totalDataSize/pageSize);
    let newData=recipes.slice(pageSize * page , pageSize*(page +1));
    // console.log(data);
    addPagination();
    pushCards(newData);
}
function addPagination(){
    pagination.innerHTML="";
    for(let i=0;i<totalPagecount;i++)
    {
        const page= document.createElement("button");
        page.classList.add("btn");
        page.innerText=i+1;
        pagination.append(page);
    }
    pages=document.querySelectorAll(".btn");
}
function pushCards(data){
    data.forEach(item=>{
        const card=document.createElement('div');
        const imgDiv=document.createElement('div');
        const img=document.createElement('img');
        const title=document.createElement('h2');
        const properties=document.createElement('div');
        const ingredients=document.createElement('h3');
        const ingList=document.createElement('ul');
        const instruction=document.createElement('h3');
        const instList=document.createElement('ol');


        card.classList.add('card');
        img.so=item.image;
        imgDiv.append(img);
        title.innerText=item.name;
        card.append(imgDiv,title,properties,ingredients,ingList,instruction,instList);
        content.append(card);
    })
}
function runApp(){
    // setActive();
    // fetchData();
    showData(sampleRecipesData);
    pages.forEach((item)=>{
        item.addEventListener("click",(event)=>{
            page=Number(item.innerText)-1;
            // page=Number(event.target.innerText)-1; //jis page ko click kiya usko number mai convert krke minus 1 coz page zero se start hai
            content.innerHTML=""; //peechle page ka data khaali 
            // fetchData(); 
            showData(sampleRecipesData);
            setActive();
        })
    });
    
    prev.addEventListener("click",(event)=>{
        if(page>0) page--;
        content.innerHTML=""
        fetchData();
        setActive();
    })
    
    next.addEventListener("click",(event)=>{
        if(page< pages.length) page++;
        content.innerHTML=""
        // fetchData();
        showData(sampleRecipesData);
        setActive();
    })
}

runApp();

function setActive(){
    if(page===0){
        prev.style.visibility="hidden";
    }
    else{
        prev.style.visibility="visible";
    }
    if(page===3){
        next.style.visibility="hidden";
    }
    else{
        next.style.visibility="visible";
    }
    pages.forEach(item => item.classList.remove("active"));
    pages[page].classList.add("active");
}

