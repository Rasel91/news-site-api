const handleCategory =async ()=>{
   const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
   const data = await response.json();
   const newsCategory = data.data.news_category

//    console.log(newsCategory);

  const tabCategory = document.getElementById('tab-container');

  newsCategory.slice(0, 5).forEach((category) => {
    // console.log(category);
    const div = document.createElement('div');
    div.innerHTML=`
    <a onclick = "handelNewsLoad('${category.category_id}')" class="tab text-center font-medium text-black"> ${category.category_name
    }</a> 
    
    `;
    tabCategory.appendChild(div);
    
  });

};




const handelNewsLoad = async(categoryId)=>{
  const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
  const data = await response.json();

  const newsContainer = document.getElementById('news-container');

  newsContainer.innerHTML ='';

 data.data.forEach((news)=>{

    // console.log(news);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card w-96  bg-base-100 shadow-xl">
    <figure><img src=${news?.image_url}/></figure>
    <div class="card-body">
      <h2 class="card-title flex justify-between">
       <div><h1>${news?.title.slice(20)}</h1></div>
        <div class="btn rounded-se-full btn-secondary">${news?.rating?.badge}</div>
      </h2>
      <p class="text-clip">${news?.details.slice(0,200)}</p>
      <div class="card-actions ">
        <div class="flex justify-self-start items-center w-2/3">
            <img class="w-2/5 h-1/5 rounded-full m-2" src=${news.author.img} />
            <div>
            <small>${news.author.name}</small>
            <small>${news.author.published_date}</small>
           </div>
        </div > 
        <div onclick = "handleModal('${news._id}')" class="btn btn-secondary mt-10">Details</div>
      </div>
    </div>
  </div>
        `;
    newsContainer.appendChild(div);
 })

// console.log(data.data);

}

// Modal Section js start


const handleModal = async(newsId)=>{

// console.log(newsId);

const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
const data = await response.json();
const modalInfo= data.data[0];

 console.log(modalInfo);

const modalContainer = document.getElementById('modal-container');
   modalContainer.innerHTML = '';
const div = document.createElement('div');
div.innerHTML=`
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <img  class=" text-center" src=${modalInfo?.image_url} />
    <h3 class="font-bold text-lg">${modalInfo?.title}</h3>
    <p class=" text-sm">${modalInfo?.details}</p>
    <p class=" text-sm"> Total Views: ${modalInfo?.total_view}</p>
    <h4 class="py-4">Author Name: ${modalInfo?.author.name}</h4>
    <h4 class="py-4">Author Name: ${modalInfo?.author.published_date}</h4>
    <div class="modal-action">
      <form method="dialog">

        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
`;

modalContainer.appendChild(div);
const modal = document.getElementById('my_modal_1');
     modal.showModal();
//    console.log(data);
};





handleCategory();
handelNewsLoad('01')