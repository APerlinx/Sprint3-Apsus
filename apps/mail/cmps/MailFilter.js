export default {
    template: `
        <section class="mail-filter">
            <input 
                v-model="filterBy.subject"
                @input="onSetFilterBy" 
                type="text" 
                placeholder="search By Subject">
            <input 
                v-model="filterBy.body" 
                @input="onSetFilterBy"
                placeholder="Search content">
            <!-- <button v-model="filterBy.sent" @click="onSetFilterBy">options</button> -->
        </section>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                body: '',
                status:'draft'
            }
        }
    },
    methods: {
        onSetFilterBy() {
          this.$emit('filter', this.filterBy)
        },
      },
    // watch: {
    //     filterBy: {
    //         handler() {
    //             this.$emit('filter', this.filterBy)
    //         },
    //         deep: true,
    //     }
    // }
}