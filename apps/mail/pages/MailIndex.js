import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="mail-index">
        <!-- <img class="gb_Mc" src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" srcset="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png 1x, https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png 2x " alt="" aria-hidden="true" role="presentation" style="width:109px;height:40px"> -->

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
            this.mails[idx].isRead = !this.mails[idx].isRead
            mailService.save(this.mails[idx])
         
        },
        // starred(mailId) {
        //     const idx = this.mails.findIndex(mail => mail.id === mailId)
        //     this.mails[idx].starred = !this.mails[idx].starred
        //     mailService.save(this.mails[idx])
         
        // },
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
            // if (this.filterBy.starred) {
            //     filteredMails = filteredMails.filter((mail) => mail.starred === this.filterBy.starred)
            //   }


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
