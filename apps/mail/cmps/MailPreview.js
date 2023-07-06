import LongText from './LongText.js'

export default {
    props: ['mail'],
    template: `
        <article :class="isRead" @click="markRead(mail)" class="mail-preview">
    
                <h3>{{ mail.from }}</h3>
                <LongText :subject="mail.subject"> </LongText>
                <h4>{{ mail.sentAt }}</h4>
                <i class="material-icons" :title="isRead ? 'Mark as Unread' : 'Mark as Read'" @click.stop="toggleReadStatus">{{ isRead ? 'mail' : 'mail_outline' }}</i>
                <i class="material-icons" title="delete" @click.stop="onRemoveMail(mail.id)">delete</i>

        </article>
    `,
    computed: {
        isRead(){
            if(this.mail.isRead) return 'isRead'
        }
        // isRead(){
        //     console.log(this.mail.id)

        // }
    },
    methods:{
        markRead(){
            this.mail.isRead = true
    
            mailService.save(this.mail)
            this.$router.push({path: `mail/${this.mail.id}`})
            this.$emit('update', this.mail.id)
    },
    toggleReadStatus() {
        this.mail.isRead = !this.mail.isRead 
        this.$emit('update', this.mail.id) 
      },
    onRemoveMail(mailId) {
        this.$emit('remove', mailId)
      },
    },
    created() {
        // console.log(this.mail)
    },
    components: { 
        LongText,
    }
}