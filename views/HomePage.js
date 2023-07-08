export default {
	template: `
        <div class="home-page">
    
        <div class="app-section welcome">
            <h1>Welcome to Our App</h1>
            <h2>A comprehensive suite of utilities to enhance productivity, organization, and communication.</h2>
            <router-link to="/about" class="app-link">About Us</router-link>
        </div>

        <div class="app-section mail-app">
            <h2>Mail App</h2>
            <p>Manage your emails effectively with our user-friendly interface, with features like scheduling, organizing, and quick responses.</p>
         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="96" height="96" viewBox="0 0 64 64">
            <linearGradient id="SVGID_1__l8GURTKU12XE_gr1" x1="14" x2="14" y1="16.447" y2="24.493" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#8cc5fc"></stop>
            <stop offset="1" stop-color="#d5a8fb"></stop>
            </linearGradient>
            <path fill="url(#SVGID_1__l8GURTKU12XE_gr1)" d="M18.9,17.8l-3.5-2.5c-1.6-0.7-3.5-0.5-4.8,0.7c-1,1-1.6,2.3-1.6,3.9v3.6l10,7.4V18.5L18.9,17.8L18.9,17.8z"></path>
            <linearGradient id="SVGID_2__l8GURTKU12XE_gr2" x1="50" x2="50" y1="16.447" y2="24.493" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#8cc5fc"></stop>
            <stop offset="1" stop-color="#d5a8fb"></stop>
            </linearGradient>
            <path fill="url(#SVGID_2__l8GURTKU12XE_gr2)" d="M55,23.5v-3.6c0-1.5-0.6-2.8-1.6-3.8c0,0,0,0,0,0c-1.5-1.5-3.9-1.5-5.5-0.3l-2.7,2l0,0L45,18.5v12.4L55,23.5z"></path>
            <linearGradient id="SVGID_3__l8GURTKU12XE_gr3" x1="32" x2="32" y1="12.957" y2="49.383" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#1a6dff"></stop>
            <stop offset="1" stop-color="#c822ff"></stop>
            </linearGradient>
            <path fill="url(#SVGID_3__l8GURTKU12XE_gr3)" d="M54.1,15.3c-1.8-1.8-4.7-1.9-6.8-0.4l-2.7,2c0,0,0,0,0,0L32,26.3L19.5,17c0,0,0,0,0,0c0,0,0,0,0,0l-2.7-2	c-2.1-1.6-5-1.4-6.8,0.4C8.7,16.6,8,18.2,8,19.9v26.7c0,1.9,1.6,3.5,3.5,3.5H19c0.6,0,1-0.4,1-1V32.9l11.4,8.4	c0.2,0.1,0.4,0.2,0.6,0.2s0.4-0.1,0.6-0.2L44,32.9v16.2c0,0.6,0.4,1,1,1h7.5c2.1,0,3.5-1.3,3.5-3.1V19.9	C56,18.2,55.3,16.6,54.1,15.3z M10,19.9c0-1.2,0.5-2.3,1.3-3.1c0.6-0.6,1.4-0.9,2.2-0.9c0.7,0,1.4,0.2,2.1,0.7l2.5,1.8	c0,0,0,0.1,0,0.1v10.4L10,23V19.9z M11.5,48.1c-0.8,0-1.5-0.7-1.5-1.5V25.5l8,5.9V40h-3v2h3v2h-5v2h5v2.1H11.5z M44,30.4l-12,8.9	l-12-8.9V19.9l11.4,8.4c0.2,0.1,0.4,0.2,0.6,0.2s0.4-0.1,0.6-0.2L44,19.9V30.4z M48.5,16.6c1.3-1,3.1-0.9,4.3,0.2	c0.8,0.8,1.3,1.9,1.3,3.1V23l-8,5.9V18.5c0,0,0-0.1,0-0.1L48.5,16.6z M52.5,48.1H46V31.4l8-5.9V40h-3v2h3v2h-5v2h5v1	C54,48,53,48.1,52.5,48.1z"></path>
         </svg>
         <router-link to="/mail" class="app-link">Check our Mail App here</router-link>
        </div>

        <div class="app-section note-app">
            <h2>Note App</h2>
            <p>Never forget anything again. Take notes, create lists, and organize your thoughts in one place.</p>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100">
                <path d="M24.5,95c-3.584,0-6.5-2.916-6.5-6.5v-73c0-3.584,2.916-6.5,6.5-6.5h37c1.78,0,2.278,1.707,3.5,3l19.219,18.03 C85.366,31.239,86,32.828,86,34.5v54c0,3.584-2.916,6.5-6.5,6.5H24.5z" opacity=".35"></path>
                <path fill="#f2f2f2" d="M22.5,93c-3.584,0-6.5-2.916-6.5-6.5v-73C16,9.916,18.916,7,22.5,7h37 c1.78,0,3.502,0.742,4.724,2.035L82.219,28.03C83.366,29.239,84,30.828,84,32.5v54c0,3.584-2.916,6.5-6.5,6.5H22.5z"></path>
                <path fill="#f9b84f" d="M22,83V17c0-2.209,1.791-4,4-4h30.286c1.095,0,2.142,0.449,2.897,1.241l17.714,18.6 C77.605,33.585,78,34.573,78,35.6V83c0,2.209-1.791,4-4,4H26C23.791,87,22,85.209,22,83z"></path>
                <path fill="#ef8630" d="M59,15v16c0,1.105,0.895,2,2,2h16l-1-2.653l-15-15.5L59,15z"></path>
                <path fill="#40396e" d="M73.5,88h-47c-3.033,0-5.5-2.467-5.5-5.5v-65c0-3.033,2.467-5.5,5.5-5.5h33 c0.412,0,0.806,0.169,1.089,0.468l18,19C78.853,31.747,79,32.116,79,32.5v50C79,85.533,76.533,88,73.5,88z M26.5,15 c-1.378,0-2.5,1.122-2.5,2.5v65c0,1.378,1.122,2.5,2.5,2.5h47c1.378,0,2.5-1.122,2.5-2.5V33.098L58.855,15H26.5z"></path>
                <path fill="#fff" d="M55.5,64.763h-12c-0.552,0-1,0.448-1,1V68.5c0,0.552,0.448,1,1,1h12c0.552,0,1-0.448,1-1v-2.737 C56.5,65.21,56.052,64.763,55.5,64.763z"></path>
                <path fill="#fff" d="M61,51.5c0,3.8-1.85,7.17-4.69,9.26H42.69C39.85,58.67,38,55.3,38,51.5C38,45.15,43.15,40,49.5,40 S61,45.15,61,51.5z"></path>
            </svg>
            <router-link to="/note" class="app-link">Check our Note App here</router-link>
        </div>

        <div class="app-section book-app">
            <h2>Book App</h2>
            <p>Discover and track your reading journey, find new book recommendations, and share your reviews.</p>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="96" height="96" viewBox="0 0 48 48">
                <path fill="#01579b" d="M8,40.884V7.116c0-1.622,1.752-2.639,3.161-1.835l29.547,16.881c1.42,0.811,1.42,2.858,0,3.669 L11.161,42.718C9.753,43.523,8,42.506,8,40.884z"></path>
                <polygon fill="#00e5ff" points="36,28.522 36,10 18,10 18,38.81"></polygon>
                <polygon fill="#00b0ff" points="18,38.81 18,10 13,10 13,41.667"></polygon>
                <polygon fill="#fff" points="33,17.71 30.509,16.21 28,17.71 28,10 33,10"></polygon>
             </svg>
             <router-link to="/book" class="app-link">Check our Book App here</router-link>
        </div>

      </div>
    `,
}
