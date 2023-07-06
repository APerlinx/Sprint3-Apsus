import LongText from './LongText.js'

export default {
    props: ['mail'],
    template: `
        <article :class="isRead" @click="markRead(mail)" class="mail-preview">
    
                <h3>{{ mail.from }}</h3>
                <LongText :subject="mail.subject"> </LongText>
                <h4>{{ mail.sentAt }}</h4>

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
    },
    created() {
        // console.log(this.mail)
    },
    components: { 
        LongText,
    }
}