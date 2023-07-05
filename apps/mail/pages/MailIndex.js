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
                @mark="markAsRead" /> 
        </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: null,
        }
    },
    methods: {
        markAsRead(mailId) {
            // mailService.save(mailId)    
            //     .then(() => {
            //         const idx = this.cars.findIndex(car => car.id === carId)
            //         this.cars.splice(idx, 1)
            //         showSuccessMsg('Car removed')
            //     })
            //     .catch(err => {
            //         showErrorMsg('Cannot remove car')
            //     })
        },
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
