export default {
    template: `
        <section class="mail-filter">
            <input 
                v-model="filterBy.txt" 
                type="text" 
                placeholder="search">
            <input 
                v-model.number="filterBy.date" 
                type="number" 
                placeholder="date">
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '', date: 0,
            }
        }
    },
    watch: {
        filterBy: {
            handler() {
                this.$emit('filter', this.filterBy)
            },
            deep: true,
        }
    }
}