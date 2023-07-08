import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <form @submit.prevent="save" class="compose-mail">
            <h2>New Message</h2>
            <input v-model="newMail.to" type="text" placeholder="To: " /><br>
            <input v-model="newMail.subject" type="text" placeholder="Subject: " required /><br>
            <textarea v-model="newMail.body" rows="12" cols="60"></textarea>

            <button :disabled="!isValid">Send</button>
            <button @click="makeNote">Make Note!</button>
            
            <hr />
            <RouterLink @click="saveToDraft" to="/mail">Cancel</RouterLink> 
            
            
        </form>
        
    `,
    data() {
        return {
            newMail: {},

        }
    },
    created() {
        this.newMail = mailService.getEmptyMail();
        this.newMail.to = '';
        this.newMail.subject = this.$route.query.subject || '';
        this.newMail.body = decodeURIComponent(this.$route.query.body) || '';
        if(this.newMail.body === 'undefined') this.newMail.body = '';
        this.newMail.status = 'draft';
    },   
    computed: {
        isValid() {
            return this.newMail.to.length > 0 &&
                   this.newMail.subject.length > 0 &&
                   this.newMail.body.length > 0 
        }
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

        },
        makeNote(){
            const subject = this.newMail.subject
            const body = this.newMail.body
            this.$router.push({
                name: 'NoteIndex',
                query: { subject, body: encodeURIComponent(body) },
              })
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
