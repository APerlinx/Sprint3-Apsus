export default {
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false,
    },
      labels: {
    type: Array, // or Object, depends on the structure of your labels
    default: () => [],
  }
  },
  template: `
    <section class="keep-app-menu">
      <div class="menu-item" :class="{ 'is-active': activeMenu === 'notes' }" @click="handleDisplayNotes">
            <i class="mdi mdi-lightbulb-on-outline grey-icon" 
            title="Notes"
            :class="{ 'is-active': activeMenu === 'notes' }"></i>
           <span v-show="isSidebarOpen">Notes</span>
      </div>
  <div class="menu-item" :class="{ 'is-active': activeMenu === 'filter' }" @click="handleFilterNotes">
        <i class="mdi mdi-filter-outline grey-icon" title="Filter"></i>
        <span span v-if="isSidebarOpen">Filter</span>
  </div>
  <div class="menu-item" :class="{ 'is-active': activeMenu === 'label' }" @click="handleOpenAddLabel">
        <i class="mdi mdi-pencil grey-icon" title="Edit labels"></i>
        <span v-if="isSidebarOpen">Edit labels</span>
  </div>
    <div class="menu-item" :class="{ 'is-active': activeMenu === 'archive' }" @click="handleDisplayArchived">
          <i class="mdi mdi-archive grey-icon" title="Archive"  :class="{ 'is-active': activeMenu === 'archive' }"></i>
          <span v-if="isSidebarOpen">Archive</span>
    </div>
  <div class="menu-item" :class="{ 'is-active': activeMenu === 'trash' }" @click="handleDisplayTrash">
         <i class="mdi mdi-trash-can-outline grey-icon" title="Trash"  :class="{ 'is-active': activeMenu === 'trash' }"></i>
         <span v-if="isSidebarOpen">Trash</span>
  </div>

    </section>  
  `,
  data() {
    return {
      activeMenu: 'notes',
    }
  },
  methods: {
    handleDisplayNotes() {
      this.activeMenu = 'notes'
      this.$emit('clear-filter')
      this.$emit('display-notes')
    },
    handleDisplayArchived() {
      this.activeMenu = 'archive';
      this.$emit('display-archived')
    },
    handleDisplayTrash() {
      // this.$router.push({ path: '/note/trash' });
      this.activeMenu = 'trash';
      this.$emit('display-trash')
    },
    handleFilterNotes() {
      this.activeMenu = 'filter'
      this.$router.push({
        name: 'NoteFilter',
        query: { labels: JSON.stringify(this.labels) },
      });
    },
    handleOpenAddLabel() {
      this.$emit('open-add-label');
    },
    toggleSidebar() {
      this.$emit('toggle-sidebar')
    },
  },
};
