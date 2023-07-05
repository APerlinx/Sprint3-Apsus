export default {
    props: ['mail'],
    template: `
        <article class="mail-preview">
            <h1>id:{{ mail.id }}</h1>
            <h2>subject:{{ mail.subject }}</h2>
            <h3>from:{{ mail.from }}</h3>
            <h4>to:{{ mail.to }}</h4>
            
            <RouterLink :to="'/mail/' + mail.id">Details</RouterLink> |
            <!-- <RouterLink :to="'/car/edit/' + car.id">Edit</RouterLink> -->
        </article>
    `,
    computed: {
    },
    created() {
    },
}