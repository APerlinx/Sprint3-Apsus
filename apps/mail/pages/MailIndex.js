import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="mail-index">
            <!-- <pre>{{mails}}</pre> -->
            <RouterLink to="/mail/compose">Compose</RouterLink> 

            <MailFilter @filter="setFilterBy"/>
            <MailList 
                v-if="mails"
                :mails="filteredMails"
                @update="update"
                @remove="removeMail" /> 
            </section>
            <!-- :mails="mails" -->
    `,
    data() {
        return {
            mails: [],
            filterBy: {},
        }
    },
    methods: {
        update(mailId) {
            // console.log(mailId)
            const idx = this.mails.findIndex(mail => mail.id === mailId)
            this.mails[idx].isRead = true
            // mailService.save(this.mail)
            // this.mails[idx].isRead = true
            // console.log(this.mails[idx])

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
            const regex1 = new RegExp(this.filterBy.body, 'i')
            filteredMails = filteredMails.filter((mail) => regex1.test(mail.body))
            filteredMails = filteredMails.filter((mail) => {

                switch (mail.status) {
                    case 'inbox':
                        return filteredMails
                        
                    case 'sent':
                        return filteredMails
                    case 'trash':
                        return filteredMails
                    case 'draft':
                        return filteredMails
        }})


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
