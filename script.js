const elementById = (id) => {
  const searchField = document.getElementById(id);
  const searchValue = searchField.value
  searchField.value = ``
  return searchValue
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
};

const showArtists = (data) => {
  console.log(data)
  const artistContainer = document.getElementById("artists");
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry}</p>
    <p>Style: ${artist.strGenre}</p>
  </div>
  <button class="album-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.strArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  console.log(id)
  const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.artists[0]));
  // const artistContainer = elementById("artists");
  // artistContainer.innerHTML = "";
};

const showAlbum = (data) => {
  console.log(data)
  const {strArtistThumb,strBiographyEN,strCountry,strGenre}=data
  const albumContainer = document.getElementById("albums");
  document.getElementById('desc').innerText=strBiographyEN
  // data.forEach((item) => {
  //   const div = document.createElement("div");
  //   div.classList.add("album");
  //   div.innerHTML = `
  //       <div class="album-image-container">
  //         <img
  //           src="${item.strAlbumThumb}"
  //           alt=""
  //         />
  //       </div>
  //       <div class="album-name">
  //         <h3>${item.strAlbum}</h3>
  //       </div>
  //     `;

  //   albumContainer.appendChild(div);
  // });
};
