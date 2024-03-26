const imgUrl = "https://image.tmdb.org/t/p/w500"
const main = document.querySelector(".main");
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const searchBox = document.querySelector(".search");
const home = document.getElementById('home');
const english = document.querySelector('.english');
const arabic = document.querySelector('.arabic');
const chinese = document.querySelector('.chinese');
const French = document.querySelector('.French');
const pageTitle = document.querySelector('h1#title');
const pagePara = document.querySelector('h4#para');
const hoverShow = document.querySelector('.show');
const hoverHidden = document.querySelector('.hide');
let language = "en-us"
let page = 1
const getTMDB = async(route,option)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTZmZmZkMGE3NGIwZjM1MThkYjhkMGU1NTQ2NzYyMyIsInN1YiI6IjY0ZjcwMjIwYThiMmNhMDExYjg4ZWQ5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZhCUzOZFwXYwWSr-Ux2Ev67Kjdj71zVpj9iW1i_-Nw'
        }
      };
try{let response = await fetch(`https://api.themoviedb.org${route}?${option.query?`query=${option.query}&`:""}language=${option.language||"en-US"}&page=${option.page||1}&sort_by=created_at.asc`, options)
 let result = await response.json()
 return result
} catch (err){console.log(err);}
}

const loadMovies =(page, language = "en-us")=>{getTMDB('/3/movie/popular', {page, language}).then(res=>{ 
  main.innerHTML=''
  res.results.forEach(movie => {
  const {id, title, release_date, poster_path, vote_average, overview} = movie
  console.log(movie)
  let img = imgUrl + poster_path
  const movieEl = document.createElement('div');
  movieEl.className.padEnd("movie");
  movieEl.innerHTML = `
  <div class="movie">
  <img class="img-hover" src="${img}" alt="image">
  <div class="movie-info">
<h5><a href="">${title}</a></h5>
<span calss="rate">${(release_date).split("-")[0]}</span>
<span class="${colorchange(vote_average)}">${vote_average}</span>
</div>
<div class="Overveiw">
         ${overview}
        </div>
  </div>
  `
  main.appendChild(movieEl)
});
})}
loadMovies(page)


nextBtn.addEventListener("click",(e)=>{
e.preventDefault();
page++;
loadMovies(page, language)
window.scroll({top:0,
behavior:"smooth"});
if(page > 1){
  previousBtn.disabled = false
}
})
previousBtn.addEventListener("click",(e)=>{
e.preventDefault();
page--;
loadMovies(page, language)
window.scroll({top:0,
behavior:"smooth"});
if(page < 2){
  previousBtn.disabled = true
}
})

const search =(query, language)=>{
  getTMDB("/3/search/movie",{page, query, language}).then(res=>{ 
  main.innerHTML=''
  let img
  res.results.forEach(movie => {
  const {title, release_date, poster_path, vote_average, overview} = movie
  if(!poster_path){
    img = "me.jpeg"
  }else
{  
  img = imgUrl + poster_path;
}  
const movieEl = document.createElement('div');
  movieEl.className.padEnd("movie");
  movieEl.innerHTML = `
  <div class="movie">
  <img class="img-hover" src="${img}" alt="image">
  <div class="movie-info">
<h5><a href="">${title}</a></h5>
<span calss="rate">${(release_date).split("-")[0]}</span>
<span class="${colorchange(vote_average)}">${vote_average}</span>
</div>
<div class="Overveiw">
        ${overview}
        </div>
  </div>
  `
//   img.onerror = function(){
//     this.onerror = null;
//     this.value = me.jpeg;
// };
  main.appendChild(movieEl)
});
})
}
function colorchange(e){
if(e>=8){
  return "rate"
}
else if(e>=5){
return "medium"
}
else{
  return "low"
}
}

searchBox.addEventListener("keyup",function(e){
  if(e.key ==='Enter'){
    search(this.value, language)
  }
});

home.addEventListener("click",(e)=> {
  e.preventDefault()
location.reload()
});

function toggleSignin(e){
  // e.preventDefault();
let x =  document.getElementById("signin");

if(x.style.display === 'none'){
  x.style.display = 'block';
}else{
  // e.preventDefault();
  x.style.display = 'none';
};
};
