export default {
    props: ['mail'],
    template: `
        <article class="mail-preview">
            <!-- <h1>id:{{ mail.id }}</h1> -->
            
            
            <RouterLink :class="isReadClass" :to="'/mail/' + mail.id">
                
                <h3>{{ mail.from }}</h3>
                <h2>{{ mail.subject }}</h2>
                <h4>{{ mail.sentAt }}</h4>
                <button @click="markRead(mail)">Mark</button>
            </RouterLink> 
            <!-- <RouterLink :to="'/car/edit/' + car.id">Edit</RouterLink> -->
        </article>
    `,
    computed: {
        isReadClass(){
            return{
                read: this.mail.isRead === true,
                unread: this.mail.isRead === false
            }
        }
        // isRead(){
        //     console.log(this.mail.id)

        // }
    },
    methods:{
        markRead(mail){
            // this.$emit('mark', mailId)
            // console.log(mail)
            if(mail.isRead = false){
                mail.isRead = true
            }
            else mail.isRead = false
            
            
            mailService.save(mail)

    },
    },
    created() {
        // console.log(this.mail)
    },
}