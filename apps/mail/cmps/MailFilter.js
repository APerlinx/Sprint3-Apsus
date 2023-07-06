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
            
                <div class="sidebar">
                    <i class="material-icons" title="Inbox" @click="onFilterClick('inbox')">inbox</i>
                    <i class="material-icons" title="Sent" @click="onFilterClick('sent')">send</i>
                    <i class="material-icons" title="Drafts" @click="onFilterClick('draft')">drafts</i>
                    <i class="material-icons" title="Trash" @click="onFilterClick('trash')">delete</i>
                </div>

                <!-- <section class="mail-index">
                    <RouterLink to="/mail/compose">Compose</RouterLink>
                    <MailFilter @filter="setFilterBy" />
                    <MailList v-if="mails" :mails="filteredMails" @update="update" @remove="removeMail" />
                 </section> -->
           
            <!-- <div class="filter-icons">
                <i class="material-icons" @click="onSetFilterBy('inbox')" title="inbox">inbox</i>
                <i class="material-icons" @click="onSetFilterBy('sent')" title="sent">send</i>
                <i class="material-icons" @click="onSetFilterBy('draft')" title="drafts">drafts</i>
                <i class="material-icons" @click="onSetFilterBy('trash')" title="trash">delete</i>
            </div> -->
        </section>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                body: '',
                status:'inbox'
            }
        }
    },
    methods: {
        onSetFilterBy(status) {
          this.filterBy.status = status
          this.$emit('filter', this.filterBy)
        },
        onFilterClick(status) {
            this.$emit('filter', { status })
          },
      },
   
}