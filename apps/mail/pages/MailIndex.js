import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'

export default {
	template: `
        <section class="mail-index">
            <!-- <pre>{{mails}}</pre> -->
            <!-- <RouterLink to="/mail/edit">Edit Mail</RouterLink>  -->

            <!-- <MailFilter @filter="setFilterBy"/> -->
            <MailList 
                v-if="mails"
                
                :mails="mails"
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
        mailService.query()
            .then(mails => this.mails = mails)
    },
    components: {
        MailFilter,
        MailList,
    }
}
