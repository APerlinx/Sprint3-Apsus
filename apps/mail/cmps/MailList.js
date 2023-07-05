import MailPreview from './MailPreview.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <TransitionGroup name="list" tag="ul">
                <li v-for="mail in mails" :key="mail.id">
                    <!-- <h1>hi</h1> -->
                    <MailPreview :mail="mail"/>
                    <section class="actions">
                        <!-- <button @click="onRemoveMail(mail.id)">x</button> -->
                    </section>
                </li>
            </TransitionGroup>
        </section>
    `,
    methods: {
        onRemoveCar(carId) {
            this.$emit('remove', mailId)
        }
    },
    components: {
        MailPreview,
    },
    name: 'MailList',
}