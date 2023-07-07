import { mailService } from '../services/mail.service.js'
import MailPreview from './MailPreview.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <TransitionGroup name="list" tag="ul">
                <li v-for="mail in mails" :key="mail.id">
                    <MailPreview @update="update" @remove="removeMail" :mail="mail"/>
                    <section class="actions">
                        <!-- <button @click="onRemoveMail(mail.id)">x</button> -->
                       
                        
                        
                    </section>
                    
            
                </li>
            </TransitionGroup>
        </section>
    `,
    methods: {
        update(mailId) {
            // console.log(mailId)
            this.$emit('update', mailId)

        },
        // starred(mailId) {
        //     // console.log(mailId)
        //     this.$emit('starred', mailId)

        // },
        removeMail(mailId){
            this.$emit('remove', mailId)
        }
        
        


    },
    computed: {



    },
    components: {
        MailPreview,
    },
    name: 'MailList',
}