export default {
	template: `
  <header :class="headerClass" class="app-header">
    <h1>AppSus</h1>
    <nav>
      <router-link to="/" :class="{active: activeRoute === 'home'}" @click="setActiveRoute('home')">Home</router-link> |
      <router-link to="/mail" :class="{active: activeRoute === 'mail'}" @click="setActiveRoute('mail')">Mail</router-link> |
      <router-link to="/note" :class="{active: activeRoute === 'note'}" @click="setActiveRoute('note')">Note</router-link> |
      <router-link to="/book" :class="{active: activeRoute === 'book'}" @click="setActiveRoute('boke')">Book</router-link> |
      <router-link to="/about" :class="{active: activeRoute === 'about'}" @click="setActiveRoute('about')">About</router-link>
    </nav>
  </header>
    `,
  data() {
    return {
      isHeaderScrolled: false,
      activeRoute: 'home'
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
    },
    setActiveRoute(route) {
      this.activeRoute = route
    }
  }
}