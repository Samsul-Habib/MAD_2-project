/*const SponCamp = Vue.component('SponCamp', {
    data() {
        return {
            campaigns: [] 
        };
    },
    mounted() {
        const username = this.$route.params.username;
        const token = localStorage.getItem("access_token"); // Get the token

        if (!token) {
            alert("You are not logged in. Please log in again.");
            this.$router.push('/'); // Redirect to login if no token
            return;
        }

        fetch(`/userlogin/spon_dash/your_camp/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Add token to Authorization header
            }
        })
            .then(response => response.json())
            .then(data => {
                this.campaigns = data;
            })
            .catch(error => {
                console.error("Error fetching campaigns:", error);
            });
    },
    template: `
        <div>
            <h1>Your Campaigns</h1>
            <table>
                <tr>
                    <th>Campaign Name</th>
                    <th>Campaign Description</th>
                    <th>Price</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="camp in campaigns" :key="camp.camp_name">
                    <td>{{ camp.camp_name }}</td>
                    <td>{{ camp.camp_details }}</td>
                    <td>{{ camp.price }}</td>
                    <td>{{ camp.start_date }}</td>
                    <td>{{ camp.end_date }}</td>
                    <td>{{ camp.category }}</td>
                    <td v-if="!camp.flagged">
                        <button @click="updateCamp(camp)">Update</button>
                        <button @click="deleteCamp(camp)">Delete</button>
                    </td>
                    <td v-if="camp.flagged">
                        <p style="color:red">*This camp has been flagged by the admin</p>
                    </td>
                </tr>
            </table>
        </div>
    `,
    methods: {
        updateCamp(camp) {
            const username = this.$route.params.username;
            this.$router.push(`/userlogin/spon_dash/update_task/${camp.id}/${username}`);
        },
        deleteCamp(camp) {
            if (confirm(`Are you sure you want to delete the campaign "${camp.camp_name}"?`)) {
                const username = this.$route.params.username;
                const token = localStorage.getItem("access_token"); // Get the token

                if (!token) {
                    alert("You are not logged in. Please log in again.");
                    this.$router.push('/'); // Redirect to login if no token
                    return;
                }

                fetch(`/delete_task/${camp.id}/${username}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}` // Add token to Authorization header
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            this.campaigns = this.campaigns.filter(c => c.camp_name !== camp.camp_name);
                        } else {
                            alert(data.message);
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting campaign:", error);
                    });
            }
        }
    }
});

export default SponCamp;*/

const SponCamp = Vue.component('SponCamp', {
    data() {
        return {
            campaigns: [] 
        };
    },
    mounted() {
        const username = this.$route.params.username;
        const token = localStorage.getItem("access_token"); // Get the token

        if (!token) {
            alert("You are not logged in. Please log in again.");
            this.$router.push('/'); // Redirect to login if no token
            return;
        }

        fetch(`/userlogin/spon_dash/your_camp/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Add token to Authorization header
            }
        })
            .then(response => response.json())
            .then(data => {
                this.campaigns = data;
            })
            .catch(error => {
                console.error("Error fetching campaigns:", error);
            });
    },
    template: `
        <div class="container mt-5">
            <h1 class="text-center mb-4">Your Campaigns</h1>
            <div v-if="campaigns.length > 0">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Campaign Description</th>
                            <th>Price</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="camp in campaigns" :key="camp.camp_name">
                            <td>{{ camp.camp_name }}</td>
                            <td>{{ camp.camp_details }}</td>
                            <td>{{ camp.price }}</td>
                            <td>{{ camp.start_date }}</td>
                            <td>{{ camp.end_date }}</td>
                            <td>{{ camp.category }}</td>
                            <td>
                                <div v-if="!camp.flagged">
                                    <button @click="updateCamp(camp)" class="btn btn-warning btn-sm">Update</button>
                                    <button @click="deleteCamp(camp)" class="btn btn-danger btn-sm ml-2">Delete</button>
                                </div>
                                <div v-if="camp.flagged">
                                    <p class="text-danger">*This camp has been flagged by the admin</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>No campaigns found.</p>
            </div>
        </div>
    `,
    methods: {
        updateCamp(camp) {
            const username = this.$route.params.username;
            this.$router.push(`/userlogin/spon_dash/update_task/${camp.id}/${username}`);
        },
        deleteCamp(camp) {
            if (confirm(`Are you sure you want to delete the campaign "${camp.camp_name}"?`)) {
                const username = this.$route.params.username;
                const token = localStorage.getItem("access_token"); // Get the token

                if (!token) {
                    alert("You are not logged in. Please log in again.");
                    this.$router.push('/'); // Redirect to login if no token
                    return;
                }

                fetch(`/delete_task/${camp.id}/${username}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}` // Add token to Authorization header
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            this.campaigns = this.campaigns.filter(c => c.camp_name !== camp.camp_name);
                        } else {
                            alert(data.message);
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting campaign:", error);
                    });
            }
        }
    }
});

export default SponCamp;
