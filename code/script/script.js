function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} H ${minute} m ${remainingSecond} s ago`
}


// created load and show catagories
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};
// Class remove function
const removeActiveClass = () =>{

  const buttons = document.getElementsByClassName("category-btn");
 // console.log(buttons);
  for(let btn of buttons){
    
    btn.classList.remove("active");
  }

}
// Load videos by catagory
const loadVideosCatagory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // Remove active class
      removeActiveClass();
      // Class list active
      const activeBtn = document.getElementById(`btn-${id}`);
    //  console.log(activeBtn);
      activeBtn.classList.add('active')
      displayVideos((data.category));
    })
    .catch((error) => console.log(error));
}



// Display loaded data
const displayCatagories = (catagories) => {
  const catagoryContainer = document.getElementById("catagory");
  catagories.forEach((item) => {
    // console.log(item);
    // create a button for each elemen
    const divContainer = document.createElement("div");
    divContainer.innerHTML =
      `
    <button class="btn category-btn" onclick = "loadVideosCatagory(${item.category_id})" id="btn-${item.category_id}">
      ${item.category}
    </button>

    `
    // const button = document.createElement("button");
    // button.classList = "btn";
    // button.innerText = item.category;
    catagoryContainer.append(divContainer);
  });
};

// created load for videos and show video in html:
const loadVedios = (searchValue = "") =>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchValue}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
// Data load for video datails and retur to display details
const videosDetailsLoad = async (videos_id) =>{
 // console.log(videos_id);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videos_id}`;
  const  res = await fetch(url);
  const data = await res.json();
  //console.log(data);
  displayDetails(data.video);

}
//  Display details
const displayDetails = (videoData)=>{
console.log(videoData);
const detailsContainer = document.getElementById('details-container');
detailsContainer.innerHTML =  `
  <img src= "${videoData.thumbnail}"/>
  <p>${videoData.description}</p>

`


const showmodal = document.getElementById("my_modal_1");
showmodal.showModal();

}





// display loaded video
const displayVideos = (videos) => {
 // console.log(videos);
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";
  // Check null condition
  if (videos.length == 0) {
    videosContainer.classList.remove("grid")
    videosContainer.innerHTML = `
    <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
    <img src = "/code/design/Icon.png">
    <h2 class="w-[30%] font-bold text-xl text-center">Oops! Sorry, There is no content here</h2>
    </div>
    `
    return;
  }
  else{
    videosContainer.classList.add("grid")
  }
  videos.forEach((item) => {
    // console.log(item.authors);
    const card = document.createElement("div");
    card.classList.add = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img
      src="${item.thumbnail}"
      alt="Shoes" class="h-full w-full object-cover rounded-[10px]" />
      ${item.others.posted_date.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-slate-500 text-white">${getTimeString(item.others.posted_date)}</span>`}
      
  </figure >
  <div class="px-0 py-2 flex gap-2">
  <div>
   <img src = "${item.authors[0].profile_picture}" class="w-10 h-10 rounded-full object-cover" />
   </div>
   <div>
   <h2 class = "font-bold">${item.title}</h2>
    <div class="flex gap-2 items-center">
    <p class = "text-gray-400">${item.authors[0].profile_name}</p>
    
    ${item.authors[0].verified == true ? `  <img src = "https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"  class = "w-5 h-5"/>` : " "}
    
  
    </div>
    <p><button onclick = "videosDetailsLoad('${item.video_id}')" class="btn btn-sm btn-error">Details</button></p>
   </div>

    
  </div>
        
        `;
    videosContainer.append(card);
  });
};
// Serach funtion
document.getElementById("searchInput").addEventListener('keyup',(e)=>{
  loadVedios(e.target.value);
})
document.getElementById('all-videos').addEventListener("click", ()=>{
  loadVedios();
})
// Function Call
loadCatagories();
loadVedios();
