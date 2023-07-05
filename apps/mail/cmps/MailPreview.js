export default {
    props: ['mail'],
    template: `
        <article class="mail-preview">
            <!-- <h1>id:{{ mail.id }}</h1> -->
            
            
            <RouterLink :to="'/mail/' + mail.id">
            <h3>{{ mail.from }}</h3>
            <h2>{{ mail.subject }}</h2>
            <h4>{{ mail.sentAt }}</h4>
        </RouterLink> 
            <!-- <RouterLink :to="'/car/edit/' + car.id">Edit</RouterLink> -->
        </article>
    `,
    computed: {
    },
    created() {
    },
}