import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import MailDetails from './apps/mail/pages/MailDetails.js'
import MailCompose from './apps/mail/pages/MailCompose.js'

import TrashedNotesList from './apps/keep/cmps/TrashedNotesList.js'


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
			path: '/note/trash',
			component: TrashedNotesList,
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
            component: MailCompose
        }
	],
}

export const router = createRouter(routerOptions)
