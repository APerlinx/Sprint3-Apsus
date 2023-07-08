import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import MailDetails from './apps/mail/pages/MailDetails.js'
import MailCompose from './apps/mail/pages/MailCompose.js'

import NoteFilter from './apps/keep/cmps/NoteFilter.js'


const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/note',
			component: NoteIndex,
		},
		{
			path: '/note-filter',
			name: 'NoteFilter',
			component: NoteFilter,
			props: true,
		},
		{
			path: '/mail',
			component: MailIndex,
		},
		{
            path: '/mail/:mailId',
            component: MailDetails
        },
		{
            path: '/mail/compose',
			name: 'MailCompose',
            component: MailCompose,
        }
	],
}

export const router = createRouter(routerOptions)
