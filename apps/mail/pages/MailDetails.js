
import { mailService } from '../services/mail.service.js'

export default {
    template: `
        <section class="mail-details" v-if="mail">
            <h1>id:{{ mail.id }}</h1>
            <h2>subject:{{ mail.subject }}</h2>
            <h3>content:{{ mail.body }}</h3>
            <!-- <h4>isRead?{{ mail.isRead }}</h4> -->
            <h5>sentAt:{{ mail.sentAt }}</h5>
            <h6>from:{{ mail.from }}</h6>
            <h6>to:{{ mail.to }}</h6>
            

            <RouterLink :to="'/mail/' + mail.nextMailId">Next Mail</RouterLink> |
            <RouterLink :to="'/mail/' + mail.prevMailId">Prev Mail</RouterLink> |
            
            <RouterLink to="/mail">Back to Mails</RouterLink>
            <!-- <button @click="onRemoveMail(mail.id)">x</button> -->
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
        // onRemoveMail(mailId) {
        //     mailService.remove(mailId)
        //         .then(() => {
        //             const idx = this.mails.findIndex(car => car.id === carId)
        //             this.cars.splice(idx, 1)
        //             showSuccessMsg('Car removed')
        //         })
        //         .catch(err => {
        //             showErrorMsg('Cannot remove car')
        //         })
        // }

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
