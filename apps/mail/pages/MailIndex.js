import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="mail-index">

            <MailFilter @filter="setFilterBy"/>
            <MailList 
                v-if="mails"
                :mails="filteredMails"
                @update="update"
                @remove="removeMail" /> 
            </section>
      
    `,
    data() {
        return {
            mails: [],
            filterBy: {},
        }
    },
    methods: {
        update(mailId) {
            const idx = this.mails.findIndex(mail => mail.id === mailId)
            this.mails[idx].isRead = true
         
        },
        removeMail(mailId) {
            mailService
                .remove(mailId)
                .then(() => {
                    const idx = this.mails.findIndex((mail) => mail.id === mailId)
                    this.mails.splice(idx, 1)
                    showSuccessMsg('Mail removed')
                })
                .catch((err) => {
                    showErrorMsg('Cannot remove mail')
                })
        },

        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredMails() {
            let filteredMails = this.mails
            const regex = new RegExp(this.filterBy.subject, 'i')
            filteredMails = filteredMails.filter((mail) => regex.test(mail.subject))
            const regex1 = new RegExp(this.filterBy.from, 'i')
            filteredMails = filteredMails.filter((mail) => regex1.test(mail.from))
            
            if (this.filterBy.status) {
                filteredMails = filteredMails.filter((mail) => mail.status === this.filterBy.status)
              }


            //   filteredMails = filteredMails.filter((mail) => mail..amount <= this.filterBy.price)

            return filteredMails
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
