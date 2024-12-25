/*const othercampdetails = Vue.component("othercampdetails", {
    props: ['camp_id', 'username'],
    data() {
        return {
            camp: null,
        };
    },
    async created() {
        await this.fetchCampDetails();
    },
    methods: {
        async fetchCampDetails() {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/spon_dash/other_camp_details/${this.camp_id}/${this.username}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    this.camp = data;
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
        <h1>Campaign Details</h1>
        <div v-if="camp && camp.flagged" class="flagged-message">
            <p><strong>Camp name:</strong> {{ camp.camp_name }}</p>
            <p><strong>Details:</strong> {{ camp.camp_details }}</p>
            <p><strong>Creator:</strong> {{ camp.username }}</p>
            <p><strong>Price:</strong> {{ camp.price }}</p>
            <p><strong>Start Date:</strong> {{ camp.start_date }}</p>
            <p><strong>End Date:</strong> {{ camp.end_date }}</p>
            <p><strong>Category:</strong> {{ camp.category }}</p>
            <p><strong>Expected Followers:</strong> {{ camp.expected_followers }}</p>
            <p><strong>Expected Reach:</strong> {{ camp.expected_reach }}</p>
            <p style="color: red;"><strong>*This camp has been flagged by the admin.</strong></p>
        </div>
        <div v-if="camp && !camp.flagged">
            <p><strong>Camp name:</strong> {{ camp.camp_name }}</p>
            <p><strong>Details:</strong> {{ camp.camp_details }}</p>
            <p><strong>Creator:</strong> {{ camp.username }}</p>
            <p><strong>Price:</strong> {{ camp.price }}</p>
            <p><strong>Start Date:</strong> {{ camp.start_date }}</p>
            <p><strong>End Date:</strong> {{ camp.end_date }}</p>
            <p><strong>Category:</strong> {{ camp.category }}</p>
            <p><strong>Expected Followers:</strong> {{ camp.expected_followers }}</p>
            <p><strong>Expected Reach:</strong> {{ camp.expected_reach }}</p>
        </div>
        <router-link :to="'/userlogin/spon_dash/' + username"><button>Home</button></router-link>
    </div>
    `,
});

export default othercampdetails;*/

const othercampdetails = Vue.component("othercampdetails", {
    props: ['camp_id', 'username'],
    data() {
        return {
            camp: null,
        };
    },
    async created() {
        await this.fetchCampDetails();
    },
    methods: {
        async fetchCampDetails() {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/spon_dash/other_camp_details/${this.camp_id}/${this.username}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    this.camp = data;
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
        <h1 class="text-center mb-4">Campaign Details</h1>

        <!-- Flagged Campaign Message -->
        <div v-if="camp && camp.flagged" class="alert alert-danger">
            <h4 class="alert-heading">Warning: This Campaign has been flagged</h4>
            <p><strong>Camp Name:</strong> {{ camp.camp_name }}</p>
            <p><strong>Details:</strong> {{ camp.camp_details }}</p>
            <p><strong>Creator:</strong> {{ camp.username }}</p>
            <p><strong>Price:</strong> {{ camp.price }}</p>
            <p><strong>Start Date:</strong> {{ camp.start_date }}</p>
            <p><strong>End Date:</strong> {{ camp.end_date }}</p>
            <p><strong>Category:</strong> {{ camp.category }}</p>
            <p><strong>Expected Followers:</strong> {{ camp.expected_followers }}</p>
            <p><strong>Expected Reach:</strong> {{ camp.expected_reach }}</p>
            <p class="text-danger"><strong>*This camp has been flagged by the admin.</strong></p>
        </div>

        <!-- Normal Campaign Details -->
        <div v-if="camp && !camp.flagged" class="card shadow-sm">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Campaign Information</h5>
            </div>
            <div class="card-body">
                <p><strong>Camp Name:</strong> {{ camp.camp_name }}</p>
                <p><strong>Details:</strong> {{ camp.camp_details }}</p>
                <p><strong>Creator:</strong> {{ camp.username }}</p>
                <p><strong>Price:</strong> {{ camp.price }}</p>
                <p><strong>Start Date:</strong> {{ camp.start_date }}</p>
                <p><strong>End Date:</strong> {{ camp.end_date }}</p>
                <p><strong>Category:</strong> {{ camp.category }}</p>
                <p><strong>Expected Followers:</strong> {{ camp.expected_followers }}</p>
                <p><strong>Expected Reach:</strong> {{ camp.expected_reach }}</p>
            </div>
        </div>

        <!-- Back to Home Button -->
        <div class="mt-4">
            <router-link :to="'/userlogin/spon_dash/' + username">
                <button class="btn btn-primary">Back to Home</button>
            </router-link>
        </div>
    </div>
    `,
});

export default othercampdetails;