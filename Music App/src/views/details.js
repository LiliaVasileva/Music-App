import { deleteById, getById } from '../api/data.js';
import { html, render, nothing } from "../lib.js";


const detailsAlbumTemplate = (album, isOwner, onDelete) => html`
<section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src=${album.imgUrl}>
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: $${album.price}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>Description: ${album.description}</p>
                    </div>

                    ${isOwner ? html `
                    <div class="actionBtn">
                        <a href="#" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                    </div>` : nothing}
                </div>
            </div>
        </section>
`


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const album = await getById(id);

    const hasUser = Boolean(ctx.user);

    const isOwner = hasUser && ctx.user._id == album._ownerId;

    ctx.render(detailsAlbumTemplate(album, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this pet?');

        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
}