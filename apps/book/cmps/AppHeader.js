export default {
    template: `
        <header class="app-header">
            <h1>BooksApp</h1>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/book">Books App</RouterLink> 
                <RouterLink to="/about">About us</RouterLink>
            </nav>
        </header>
    `,
    data() {
        return {}
    },
    methods: {}
}