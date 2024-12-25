/*const SponAd = Vue.component('SponAd', {
    data() {
        return {
            ads: []
        };
    },
    mounted() {
        const username = this.$route.params.username;
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("You are not logged in. Please log in again.");
            this.$router.push('/');
            return;
        }
        fetch(`/userlogin/spon_dash/your_ad/${username}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.ads = data;
            })
            .catch(error=>{
                console.error("Error fetching ads:",error)
            })
    },
    template: `
        <div>
            <h1>Your Ads</h1>
            <table>
                <tr>
                    <th>Ad title</th>
                    <th>Ad Description</th>
                    <th>Campaign Name</th>
                    <th>Target audience</th>
                    <th>Budget</th>
                    <th>Duration</th>
                </tr>
                <tr v-for="ad in ads" :key="ad.ad_name">
                    <td>{{ ad.ad_name }}</td>
                    <td>{{ ad.ad_details }}</td>
                    <td>{{ ad.camp_name }}</td>
                    <td>{{ ad.ad_aud }}</td>
                    <td>{{ ad.ad_price }}</td>
                    <td>{{ ad.ad_dur }}</td>
                    <td v-if="!ad.flagged">
                        <button @click="updateAd(ad)">Update</button>
                        <button @click="deleteAd(ad)">Delete</button>
                    </td>
                    <td v-if="ad.flagged">
                        <p style="color:red">*This ad has been flagged by the admin</p>
                    </td>
                </tr>
            </table>
        </div>
    `,
    methods: {
        updateAd(ad) {
            const username = this.$route.params.username;
            this.$router.push(`/userlogin/spon_dash/update_ad/${ad.id}/${username}`);
        },
        deleteAd(ad) {
            const username = this.$route.params.username;
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }
            if (confirm(`Are you sure you want to delete the ad "${ad.ad_name}"?`)) {
                const username = this.$route.params.username;

                fetch(`/delete_ad/${ad.id}/${username}`, {
                    method: 'POST',
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Remove the deleted campaign from the campaigns list
                            this.ads = this.ads.filter(a => a.id !== ad.id);
                        } else {
                            alert(data.message);  // Show error message
                        }
                });
            }
        }
    }
});

export default SponAd;*/


const SponAd = Vue.component('SponAd', {
    data() {
        return {
            ads: []
        };
    },
    mounted() {
        const username = this.$route.params.username;
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("You are not logged in. Please log in again.");
            this.$router.push('/');
            return;
        }
        fetch(`/userlogin/spon_dash/your_ad/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                this.ads = data;
            })
            .catch(error => {
                console.error("Error fetching ads:", error)
            })
    },
    template: `
        <div class="container mt-5">
            <h1 class="text-center mb-4">Your Ads</h1>
            <div v-if="ads.length > 0">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Ad Title</th>
                            <th>Ad Description</th>
                            <th>Campaign Name</th>
                            <th>Target Audience</th>
                            <th>Budget</th>
                            <th>Duration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ad in ads" :key="ad.ad_name">
                            <td>{{ ad.ad_name }}</td>
                            <td>{{ ad.ad_details }}</td>
                            <td>{{ ad.camp_name }}</td>
                            <td>{{ ad.ad_aud }}</td>
                            <td>{{ ad.ad_price }}</td>
                            <td>{{ ad.ad_dur }}</td>
                            <td>
                                <div v-if="!ad.flagged">
                                    <button @click="updateAd(ad)" class="btn btn-warning btn-sm">Update</button>
                                    <button @click="deleteAd(ad)" class="btn btn-danger btn-sm ml-2">Delete</button>
                                </div>
                                <div v-if="ad.flagged">
                                    <p class="text-danger">*This ad has been flagged by the admin</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>No ads found.</p>
            </div>
        </div>
    `,
    methods: {
        updateAd(ad) {
            const username = this.$route.params.username;
            this.$router.push(`/userlogin/spon_dash/update_ad/${ad.id}/${username}`);
        },
        deleteAd(ad) {
            const username = this.$route.params.username;
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }
            if (confirm(`Are you sure you want to delete the ad "${ad.ad_name}"?`)) {
                fetch(`/delete_ad/${ad.id}/${username}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Remove the deleted ad from the ads list
                            this.ads = this.ads.filter(a => a.id !== ad.id);
                        } else {
                            alert(data.message);  // Show error message
                        }
                    });
            }
        }
    }
});

export default SponAd;
