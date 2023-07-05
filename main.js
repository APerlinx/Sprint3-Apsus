const { createApp } = Vue

import { router } from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'

import NoteIndex from './apps/keep/pages/NoteIndex.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

const options = {
	template: `
        <section>
        <AppHeader @change-route="route = $event"/>
        <section class="main-route">
            <HomePage v-if="route === 'home'"/>
            <MailIndex v-if="route === 'mail'" />
            <NoteIndex v-if="route === 'note'" />
            <AboutPage v-if="route === 'about'" />
        </section>
            <RouterView />
            <AppFooter />
            <UserMsg />
        </section>
    `,
        data() {
            return {
                route: 'about',
            }
        },
	 components: {
		AppHeader,
		AppFooter,
		UserMsg,
        HomePage,
        AboutUs,
        NoteIndex,
        MailIndex,
	},
}

const app = createApp(options)
app.use(router)
app.mount('#app')
