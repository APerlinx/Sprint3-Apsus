export default {
	template: `
  <header :class="headerClass" class="app-header">
    <h1>AppSus</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/mail">Mail</router-link> |
      <router-link to="/note">Note</router-link> |
      <router-link to="/book">book</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </header>
    `,
  data() {
    return {
      isHeaderScrolled: false
    };
  },
  computed: {
    headerClass() {
      return {
        'header-shadow': this.isHeaderScrolled
      };
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isHeaderScrolled = window.pageYOffset > 0;
    }
  }
}