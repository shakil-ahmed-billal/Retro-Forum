const postData = async(search = "") => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`;
    const res = await fetch(url)
    const data = await res.json()
    display(data.posts);
}

const display =(posts) =>{
    console.log(posts);
    const postSection = document.getElementById('post-container');
    postSection.innerHTML= "";
    posts.forEach( post => {
        const newPosts = document.createElement('div')
        newPosts.innerHTML = `
                      <div class="broder shadow-2xl p-8 md:flex rounded-3xl">
                <div class=" flex relative justify-center md:justify-start">
                  <img class="w-20 h-20 rounded-2xl object-cover" src="${post.image}" alt=" ">
                  <div class="absolute bg-green-500 w-3 h-3 rounded-full -top-1 -right-1"></div>
                </div>
                <div class="ml-6">
                  <div class="flex mb-3 space-x-5">
                    <p>#${post.category}</p>
                    <p>Author: ${post.author.name}</p>
                  </div>
                  <p class="text-2xl font-extrabold text-gray-500">${post.title}</p>
                  <p class="text-gray-400 my-3">${post.description}</p>
                  <div class="border-b-2 border-dashed"></div>
                  <div class="flex justify-between mt-4 ">
                    <div class="flex gap-5 items-center text-gray-400 font-bold">
                      <p><i class="mr-2 fa-regular fa-envelope"></i>${post.comment_count}</p>
                      <p><i class="mr-2 fa-regular fa-eye"></i>${post.view_count}</p>
                      <p><i class="mr-2 fa-regular fa-clock"></i>${post.posted_time}Min</p>
                    </div>
                    <p id="marksRead" onclick="markPost('${post.description}','${post.view_count}')" class="bg-green-400 cursor-pointer p-2 rounded-full w-10 h-10 flex justify-center items-center"><i class="fa-solid fa-envelope-open"></i></p>
                  </div>
                </div>
              </div>
        `;
        postSection.appendChild(newPosts);
    });
}

const markPost = (title , views) => {
  const marksReadSection = document.getElementById('markAsReadContainer')

  const div = document.createElement('div')
  div.innerHTML = `
                 <div class="flex items-center bg-white p-2 rounded-3xl">
                    <p>${title}</p>
                    <p class="ml-2 flex items-center"><i class="mr-2 fa-regular fa-eye"></i>${views}</p>
                  </div>
  `
  marksReadSection.appendChild(div);


  const marksValue = document.getElementById('markAsReadCounter').innerText;
  const newMarksValue = parseFloat(marksValue);
  const countMarksValue = newMarksValue + 1 ;

  document.getElementById('markAsReadCounter').innerText = countMarksValue;
}




document.getElementById('searchPostsBtn').addEventListener('click', ()=>{
    const inputSearch = document.getElementById('searchPosts').value;
    postData(inputSearch)
    
})



const latestPost = async() =>{
  const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;
  const res = await fetch(url)
  const data = await res.json()

  latestDisplay(data)
}
const latestDisplay = (data) =>{
  const latestSection = document.getElementById('latest-post-container');

  data.forEach(e => {

    const div = document.createElement("div");
    div.innerHTML= `
             <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
          <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src=${e.cover_image}
                  alt="Shoes"
                  class="rounded-xl"
              />
          </figure>
          <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i>author?.posted_date || "No Publish Date"
              </p>
              <h2 class="card-title text-start">title</h2>
              <p class="text-start">
                  description
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src=${e.profile_image}
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold">author.name</h3>
              <p class="text-start opacity-60">author?.designation || "Unknown"</p>
          </div>
      </div>

          <span
            id="latestPostLoader"
            class="loading loading-infinity loading-lg lg:mt-24 text-primary hidden"
          >

        </span>
          <!-- dynamic content -->
        </div>
    `
    latestSection.appendChild(div)
  });
}

postData()
latestPost()