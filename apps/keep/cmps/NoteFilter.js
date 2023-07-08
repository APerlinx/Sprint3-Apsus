export default {
  template: `
    <section class="filter">
    <div class="search-container">
      <i class="mdi mdi-magnify search-icon">
        <input 
            type="text"
            placeholder="Search"
            class="filter-input"
            v-model="searchQuery"
            @keyup.enter="filterBySearch">
      </i>
      <div class="go-back-btn" @click="goBackToNotes">Go back</div>
    </div>
      
     <ul>
      <li v-for="label in labels" 
             :key="label" 
             class="label-item clean-list"
             @click="filterBy(label)" >
        {{ label }}
      </li>
     </ul>
    </section>
    `,
  data() {
    return {
      searchQuery: '',
      labels: [],
    }
  },
  created() {
    if (this.$route.query.labels) {
      this.labels = JSON.parse(this.$route.query.labels);
    }
  },
  
  
  methods: {
    handleLabelsFetched(labels) {
        this.labels = labels
        console.log('labels', this.labels);
    },
    filterBy(label) {
        this.$router.push({ path: '/note', query: { label } });
    },
    filterBySearch() { 
      if (this.searchQuery) {
          this.$router.push({ path: '/note', query: { search: this.searchQuery } });
      }
    },
    goBackToNotes() {
        this.$router.push({ path: '/note' });
    }
  },
}
