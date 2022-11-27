import { getAll } from "../api/data.js";
import { html, nothing } from '../lib.js'
import { getUserData } from "../util.js";




const catalogTemplate = (albums) => html`
<section id="catalogPage">
${!albums ? html`
    <p>No Albums in Catalog!</p>`
        : html`
    <h1>All Albums</h1>
    ${albums.map(albumCardTemplate)}`}
</section>
`

const albumCardTemplate = (album) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${renderButton()}
    </div>
</div>`;

function renderButton(){
    const user = getUserData();
    if (!user){
        return nothing
    }
    return html`
    <div class="btn-group">
        <a href="#" id="details">Details</a>
    </div>`
}



export async function showCatalog(ctx) {
    const albums = await getAll();

    ctx.render(catalogTemplate(albums));
}