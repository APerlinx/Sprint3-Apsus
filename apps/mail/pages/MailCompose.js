import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <form @submit.prevent="save" class="compose-mail">
            <h2>New Message</h2>
            <input v-model="newMail.to" type="text" placeholder="To: "> <br>
            <input v-model="newMail.subject" type="text" placeholder="Subject: " required> <br>
            <textarea v-model="newMail.body" rows="12" cols="60"></textarea>
            <button :disabled="!isValid">Send</button>
            
            <hr />
            <RouterLink @click="saveToDraft" to="/mail">Cancel</RouterLink> 
            
            
        </form>
        
    `,
    data() {
        return {
            newMail: {},

        }
    },
    computed: {
        isValid() {
            return this.newMail.to.length > 0 &&
                   this.newMail.subject.length > 0 &&
                   this.newMail.body.length > 0 
        }
    },
    created() {
        this.newMail = mailService.getEmptyMail()
        this.newMail.status = 'draft'

    },

    methods: {
        save() {
            this.newMail.status = 'sent'
            mailService.save(this.newMail)
                .then(mail => {
                    console.log('Saved Mail', mail)
                    showSuccessMsg('Mail sent')
                    this.$router.push('/mail')
                })
                .catch(err => {
                    showErrorMsg('Cannot send mail')
                })
        },
        saveToDraft(){
            console.log('hi')
            // if()
            // this.newMail.status = 'draft'
            mailService.save(this.newMail)

        }

    },
    watch: {
        // newMail: {
        //     handler() {
        //         mailService.save(this.newMail)
                
        //     },
        //     deep: true,
        // }
    }
}
