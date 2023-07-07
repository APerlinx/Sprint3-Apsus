export default {
    template: `
        <section class="mail-filter">

            <section class="top-actions">

                <input 
                    v-model="filterBy.subject"
                    @input="onSetFilterBy" 
                    type="text" 
                    placeholder="search By Subject">
                <input 
                    v-model="filterBy.from" 
                    @input="onSetFilterBy"
                    placeholder="Search by Email Address">
                
                </section>
                
                <div class="sidebar">
                  <div>
                      <RouterLink to="/mail/compose">
                        <i title="Compose" class="material-icons">create</i>
                    </RouterLink>
                  </div>
                  <div class ="filterIcons">
                      <i class="material-icons" title="Inbox" @click="onFilterClick('inbox')">inbox</i>
                      <i class="material-icons" title="Sent" @click="onFilterClick('sent')">send</i>
                      <i class="material-icons" title="Drafts" @click="onFilterClick('draft')">drafts</i>
                      <i class="material-icons" title="Trash" @click="onFilterClick('trash')">delete</i>

                  </div>
                <!-- <i class="material-icons" @click="onFilterByStarred">star</i> -->
            </div>

            
        </section>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                body: '',
                status:'inbox',
                // starred:'true'
            }
        }
    },
    methods: {
        onSetFilterBy() {
            this.$emit('filter', this.filterBy)
        },
        onFilterClick(status) {
            this.filterBy.status = status
            this.$emit('filter', this.filterBy)
          },
        // onFilterByStarred(){
        //     this.$emit('filter', this.filterBy)
        // }
      },
   
}