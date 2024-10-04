const postData = async(search = "") => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`;
    const res = await fetch(url)
    const data = await res.json()
    display(data.posts);
}
/**
 * "id": 101,
"category": "Comedy",
"image": "https://i.ibb.co/0QRxkd5/pexels-jan-kop-iva-3525908.jpg",
"isActive": true,
"title": "10 Kids Unaware of Their Costume",
"author": {
"name": "John Doe"
},
"description": "It is one thing to subject yourself to a costume mishap",
"comment_count": 560,
"view_count": 1568,
"posted_time": 5
 */
const display =(posts) =>{
    console.log(posts);
    const postSection = document.getElementById('post-container');
    postSection.innerHTML= "";
    posts.forEach( post => {
        const newPosts = document.createElement('div')
        newPosts.innerHTML = `
                      <div class="broder shadow-2xl p-8 md:flex rounded-3xl">
                <div class="w-20 h-20 flex relative justify-center md:justify-start">
                  <img class="w-full rounded-2xl object-cover" src="${post.image}" alt=" ">
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

postData()