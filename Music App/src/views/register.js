import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { register } from '../api/user.js'
import { updateNav } from './nav.js';


const registerTemplate = (onRegister) => html`        
<section id="registerPage">
    <form @submit=${onRegister}>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="confPass" class="vhide">Confirm Password:</label>
            <input id="confPass" class="confPass" name="confPass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>
`

export function showRegister(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({ email, password, confPass }) {

        if (email == '' || password == '') {
            return alert('All fields are required');
        }
        if (password != confPass) {
            return alert('Password don\'t match');
        }

        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect('/')
    }

}