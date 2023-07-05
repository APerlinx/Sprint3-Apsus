import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'

export default {
	template: `
        <section class="mail-index">
            <h1>hi</h1>
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
            mails: [],
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
