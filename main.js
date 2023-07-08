const { createApp } = Vue

import { router } from './routes.js'
import { eventBus } from './services/event-bus.service.js'; // Import the eventBus object

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'

import NoteIndex from './apps/keep/pages/NoteIndex.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import BookIndex from './apps/book/pages/BookIndex.js'
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
            <BookIndex v-if="route === 'book'" />
            <AboutUs v-if="route === 'about'" />
        </section>
            <RouterView />
            <AppFooter />
            <UserMsg />
        </section>
    `,
        data() {
            return {
                route: '',
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
        BookIndex,
	},
}

const app = createApp(options)
app.config.globalProperties.$eventBus = eventBus; // Provide the event bus to the global properties
app.use(router)
app.mount('#app')
