import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'

export default {
	template: `
        <section class="mail-index">
            <pre>{{mails}}</pre>
            <!-- <RouterLink to="/mail/edit">Edit Mail</RouterLink>  -->

            <!-- <MailFilter @filter="setFilterBy"/> -->
            <MailList 
                v-if="mails"
                :mails="filteredMails"
                @remove="removeMail" /> 
        </section>
    `,
    data() {
        return {
            mails: [{
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt : 1551133930594,
                removedAt : null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
                }],
            filterBy: null,
        }
    },
    created() {
        // mailService.query()
        //     .then(cars => this.cars = cars)
    },
    components: {
        MailFilter,
        MailList,
    }
}
