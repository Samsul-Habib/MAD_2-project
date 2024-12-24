/*const otheraddetails = Vue.component("otheraddetails", {
    props: ['ad_id', 'username'],
    data() {
        return {
            ad: null,
        };
    },
    async created() {
        await this.fetchAdDetails();
    },
    methods: {
        async fetchAdDetails() {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/spon_dash/other_ad_details/${this.ad_id}/${this.username}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    this.ad = data;
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (err) {
                console.error("Error:", err);
            }
        }
    },
    template: `
    <div>
        <h1>Ad Details</h1>
        <div v-if="ad && ad.flagged" class="flagged-message">
            <p><strong>Ad name:</strong> {{ ad.ad_name }}</p>
            <p><strong>Details:</strong> {{ ad.ad_details }}</p>
            <p><strong>Creator:</strong> {{ ad.username }}</p>
            <p><strong>Price:</strong> {{ ad.ad_price }}</p>
            <p><strong>Camp name:</strong> {{ ad.camp_name }}</p>
            <p><strong>Duration:</strong> {{ ad.ad_dur }}</p>
            <p><strong>Target audience:</strong> {{ ad.ad_aud }}</p>
            <p style="color: red;"><strong>*This ad has been flagged by the admin.</strong></p>
        </div>
        <div v-if="ad && !ad.flagged">
            <p><strong>Ad name:</strong> {{ ad.ad_name }}</p>
            <p><strong>Details:</strong> {{ ad.ad_details }}</p>
            <p><strong>Creator:</strong> {{ ad.username }}</p>
            <p><strong>Price:</strong> {{ ad.ad_price }}</p>
            <p><strong>Camp name:</strong> {{ ad.camp_name }}</p>
            <p><strong>Duration:</strong> {{ ad.ad_dur }}</p>
            <p><strong>Target audience:</strong> {{ ad.ad_aud }}</p>
        </div>
        <router-link :to="'/userlogin/spon_dash/' + username"><button>Home</button></router-link>
    </div>
    `,
});
export default otheraddetails;*/

const otheraddetails = Vue.component("otheraddetails", {
    props: ['ad_id', 'username'],
    data() {
        return {
            ad: null,
        };
    },
    async created() {
        await this.fetchAdDetails();
    },
    methods: {
        async fetchAdDetails() {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/spon_dash/other_ad_details/${this.ad_id}/${this.username}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    this.ad = data;
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (err) {
                console.error("Error:", err);
            }
        }
    },
    template: `
    <div class="container mt-5">
        <h1 class="text-center text-primary mb-4">Ad Details</h1>
        <div v-if="ad && ad.flagged" class="card border-danger">
            <div class="card-header bg-danger text-white">
                <strong>Flagged Ad</strong>
            </div>
            <div class="card-body">
                <p><strong>Ad name:</strong> {{ ad.ad_name }}</p>
                <p><strong>Details:</strong> {{ ad.ad_details }}</p>
                <p><strong>Creator:</strong> {{ ad.username }}</p>
                <p><strong>Price:</strong> {{ ad.ad_price }}</p>
                <p><strong>Camp name:</strong> {{ ad.camp_name }}</p>
                <p><strong>Duration:</strong> {{ ad.ad_dur }}</p>
                <p><strong>Target audience:</strong> {{ ad.ad_aud }}</p>
                <p class="text-danger"><strong>*This ad has been flagged by the admin.</strong></p>
            </div>
        </div>
        <div v-if="ad && !ad.flagged" class="card border-primary">
            <div class="card-header bg-primary text-white">
                <strong>Ad Information</strong>
            </div>
            <div class="card-body">
                <p><strong>Ad name:</strong> {{ ad.ad_name }}</p>
                <p><strong>Details:</strong> {{ ad.ad_details }}</p>
                <p><strong>Creator:</strong> {{ ad.username }}</p>
                <p><strong>Price:</strong> {{ ad.ad_price }}</p>
                <p><strong>Camp name:</strong> {{ ad.camp_name }}</p>
                <p><strong>Duration:</strong> {{ ad.ad_dur }}</p>
                <p><strong>Target audience:</strong> {{ ad.ad_aud }}</p>
            </div>
        </div>
        <div class="text-center mt-4">
            <router-link :to="'/userlogin/spon_dash/' + username">
                <button class="btn btn-primary">Home</button>
            </router-link>
        </div>
    </div>
    `,
});
export default otheraddetails;