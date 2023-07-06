
import { mailService } from '../services/mail.service.js'

export default {
    template: `
        <section class="mail-details" v-if="mail">
            <div class="header">
                <h1 class="from">{{ mail.from }}</h1>
                <h5 class="sent-at">{{ mail.sentAt }}</h5>
            </div>
            <h2 class="subject">{{ mail.subject }}</h2>
            <div class="content">{{ mail.body }}</div>
            <h6 class="to">To: {{ mail.to }}</h6>
            

            <div class="navigation">
                <RouterLink :to="'/mail/' + mail.nextMailId">Next Mail</RouterLink> |
                <RouterLink :to="'/mail/' + mail.prevMailId">Prev Mail</RouterLink> |
                <RouterLink to="/mail">Back to Mails</RouterLink>
             </div>
     
        </section>
    `,
    data() {
        return {
            mail: [],
        }
    },
    created() {
        this.loadMail()




    },
    methods: {
        loadMail() {
            const { mailId } = this.$route.params
            mailService
                .get(mailId)
                .then(mail => {
                    this.mail = mail
                })
                .catch(err => {
                    // alert('Cannot load mail')
                    this.$router.push('/mail')
                })
        },

    },
    watch: {
        mailId() {
            this.loadMail()
        },
    },
    computed: {
        mailId() {
            return this.$route.params.mailId
        },
    },
}
