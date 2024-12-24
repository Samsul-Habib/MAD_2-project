/*const sponSearchInflu = Vue.component("sponSearchInflu", {
    props:['username'],
    template: `
    <div class="container" id="container">
        <div class="form-container sign-up">
            <form @submit.prevent="searchInfluencers">
                <h1>Search for Influencers</h1>
                
                <label for="niche"><strong>Select Preferences:</strong></label>
                <select v-model="niche" id="niche" name="niche" required>
                    <option value="fashion">Fashion</option>
                    <option value="fitness">Fitness</option>
                    <option value="tech">Technology</option>
                    <option value="travel">Travel</option>
                    <option value="food">Food</option>
                </select>
                <br>
                
                <label for="reach"><strong>Select your reach:</strong></label>
                <select v-model="reach" id="reach" name="reach" required>
                    <option value="1000-10,000">Nano (1000-10,000)</option>
                    <option value="10,000-50,000">Micro (10,000-50,000)</option>
                    <option value="50,000-500,000">Mid-Tier (50,000-500,000)</option>
                    <option value="500,000-1,000,000">Macro (500,000-1,000,000)</option>
                    <option value="1,000,000+">Mega (1,000,000+)</option>
                </select>
                <br>
                
                <label for="followers"><strong>Select your followers:</strong></label>
                <select v-model="followers" id="followers" name="followers" required>
                    <option value="1,000-5,000">1,000-5,000</option>
                    <option value="5,001-20,000">5,001-20,000</option>
                    <option value="20,001-50,000">20,001-50,000</option>
                    <option value="50,001-100,000">50,001-100,000</option>
                    <option value="100,000+">100,000+</option>
                </select>
                <br>
                
                <button type="submit" class="button">Search</button>
            </form>

            <div v-if="influencers.length > 0" class="influencer-list">
                <h2>Influencers Found:</h2>
                <div v-for="influencer in influencers" :key="influencer.username" class="influencer-item">
                    <p><strong>***Username:</strong> {{ influencer.username }}</p>
                    <p><strong>Motto:</strong> {{ influencer.motto }}</p>
                    <p><strong>Experience:</strong> {{ influencer.exp }}</p>
                </div>
            </div>
            <div v-else>
                <p>No influencers found.</p>
            </div>
            <router-link :to="'/userlogin/spon_dash/' + username">Home</router-link>
        </div>
    </div>
    `,
    data() {
        return {
            niche: '',
            reach: '',
            followers: '',
            influencers: []
        };
    },
    methods: {
        async searchInfluencers() {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }
            const searchParams = {
                niche: this.niche,
                reach: this.reach,
                followers: this.followers
            };
            
            try {
                const response = await fetch(`/userlogin/spon_dash/search_influ/${this.$route.params.username}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(searchParams)
                });

                const data = await response.json();
                if (response.ok) {
                    this.influencers = data.influencers;
                } else {
                    console.error('Error fetching influencers:', data.message);
                    this.influencers = [];
                }
            } catch (error) {
                console.error('Error:', error);
                this.influencers = [];
            }
        }
    }
});

export default sponSearchInflu;*/

const sponSearchInflu = Vue.component("sponSearchInflu", {
    props:['username'],
    template: `
    <div class="container mt-5" id="container">
        <div class="form-container sign-up">
            <form @submit.prevent="searchInfluencers" class="border p-4 rounded shadow-sm">
                <h1 class="text-center mb-4">Search for Influencers</h1>
                
                <div class="mb-3">
                    <label for="niche" class="form-label"><strong>Select Preferences:</strong></label>
                    <select v-model="niche" id="niche" name="niche" class="form-select" required>
                        <option value="fashion">Fashion</option>
                        <option value="fitness">Fitness</option>
                        <option value="tech">Technology</option>
                        <option value="travel">Travel</option>
                        <option value="food">Food</option>
                    </select>
                </div>
                
                <div class="mb-3">
                    <label for="reach" class="form-label"><strong>Select your reach:</strong></label>
                    <select v-model="reach" id="reach" name="reach" class="form-select" required>
                        <option value="1000-10,000">Nano (1000-10,000)</option>
                        <option value="10,000-50,000">Micro (10,000-50,000)</option>
                        <option value="50,000-500,000">Mid-Tier (50,000-500,000)</option>
                        <option value="500,000-1,000,000">Macro (500,000-1,000,000)</option>
                        <option value="1,000,000+">Mega (1,000,000+)</option>
                    </select>
                </div>
                
                <div class="mb-3">
                    <label for="followers" class="form-label"><strong>Select your followers:</strong></label>
                    <select v-model="followers" id="followers" name="followers" class="form-select" required>
                        <option value="1,000-5,000">1,000-5,000</option>
                        <option value="5,001-20,000">5,001-20,000</option>
                        <option value="20,001-50,000">20,001-50,000</option>
                        <option value="50,001-100,000">50,001-100,000</option>
                        <option value="100,000+">100,000+</option>
                    </select>
                </div>
                
                <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-lg">Search</button>
                </div>
            </form>

            <div v-if="influencers.length > 0" class="mt-4 influencer-list">
                <h2>Influencers Found:</h2>
                <div v-for="influencer in influencers" :key="influencer.username" class="influencer-item mb-3 p-3 border rounded shadow-sm">
                    <p><strong>Username:</strong> {{ influencer.username }}</p>
                    <p><strong>Motto:</strong> {{ influencer.motto }}</p>
                    <p><strong>Experience:</strong> {{ influencer.exp }}</p>
                </div>
            </div>
            <div v-else>
                <p>No influencers found.</p>
            </div>

            <div class="text-center mt-4">
                <router-link :to="'/userlogin/spon_dash/' + username" class="btn btn-secondary">Back to Dashboard</router-link>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            niche: '',
            reach: '',
            followers: '',
            influencers: []
        };
    },
    methods: {
        async searchInfluencers() {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }
            const searchParams = {
                niche: this.niche,
                reach: this.reach,
                followers: this.followers
            };
            
            try {
                const response = await fetch(`/userlogin/spon_dash/search_influ/${this.$route.params.username}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(searchParams)
                });

                const data = await response.json();
                if (response.ok) {
                    this.influencers = data.influencers;
                } else {
                    console.error('Error fetching influencers:', data.message);
                    this.influencers = [];
                }
            } catch (error) {
                console.error('Error:', error);
                this.influencers = [];
            }
        }
    }
});

export default sponSearchInflu;

