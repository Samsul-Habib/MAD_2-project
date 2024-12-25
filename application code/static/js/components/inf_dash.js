/*const influencerdashboard = Vue.component("influencerdashboard", {
  props: ['username'],
  data() {
    return {
      campaigns: [],
      ads: [],
      selectedCampaign: null,
      selectedAd: null,
      showShareModal: false,
    };
  },
  template: `
    <div>
      <h1>Welcome, {{ username }}</h1>

      <div class="header">
        <router-link :to="'/userlogin/inf_dash/your_camps/' + username"><button>Your Campaigns</button></router-link>
        <router-link :to="'/userlogin/inf_dash/camps/' + username"><button>Search Camps</button></router-link>
        <router-link :to="'/userlogin/inf_dash/submit_your_like/' + username"><button>Define You</button></router-link>
        <router-link :to="'/userlogin/influencer_dash/send_message/' + username"><button>Chat</button></router-link>
        <button @click="logout">Logout</button>
      </div>

      <div class="content">
        <h3>Active Campaigns:</h3>
        <ul>
          <li v-for="(campaign, index) in campaigns" :key="index">
            {{ 'Campaign ' + (index + 1) }} 
            <button @click="viewCampaign(campaign)">View</button>
          </li>
        </ul>

        <h3>Active Ads:</h3>
        <ul>
          <li v-for="(ad, index) in ads" :key="index">
            {{ 'Ad ' + (index + 1) }} 
            <button @click="viewAd(ad)">View</button>
          </li>
        </ul>
      </div>

      <!-- Show details of selected campaign -->
      <div v-if="selectedCampaign">
        <h3>Campaign Details</h3>
        <p><strong>Name:</strong> {{ selectedCampaign.camp_name }}</p>
        <p><strong>Description:</strong> {{ selectedCampaign.description }}</p>
        <p><strong>Start Date:</strong> {{ selectedCampaign.start_date }}</p>
        <p><strong>End Date:</strong> {{ selectedCampaign.end_date }}</p>
        <p><strong>Price:</strong> {{ selectedCampaign.price }}</p>
        <p><strong>Category:</strong> {{ selectedCampaign.category }}</p>
        <p><strong>Creator:</strong> {{ selectedCampaign.creator }}</p>
        <button @click="clearSelected">Close</button>
      </div>

      <!-- Show details of selected ad -->
      <div v-if="selectedAd">
        <h3>Ad Details</h3>
        <p><strong>Name:</strong> {{ selectedAd.ad_name }}</p>
        <p><strong>Details:</strong> {{ selectedAd.ad_details }}</p>
        <p><strong>Camp Name:</strong> {{ selectedAd.camp_name }}</p>
        <p><strong>Creator:</strong> {{ selectedAd.creator }}</p>
        <p><strong>Audience:</strong> {{ selectedAd.audience }}</p>
        <p><strong>Budget:</strong> {{ selectedAd.budget }}</p>
        <p><strong>Duration:</strong> {{ selectedAd.duration }}</p>
        <button @click="clearSelected">Close</button>
        <button @click="shareAd">Share</button>
      </div>
      <div v-if="showShareModal" class="modal-overlay">
        <div class="modal">
          <p>Ad shared successfully.</p>
          <button @click="showShareModal = false">Close</button>
        </div>
      </div>
    </div>
  `,
  methods: {
    async fetchData() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          this.$router.push('/');
          return;
        }

        const response = await fetch(`/userlogin/inf_dash/${this.username}`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.username!==this.username){
            alert("Unauthorized access.");
            this.$router.push('/');
            return;
          }
          this.campaigns = data.campaigns;
          this.ads = data.ads;
          this.username = data.username;
        } else {
          const error = await response.json();
          alert(error.message);
          if (error.message==="Unauthorised access"){
            this.logout();
          }
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },
    viewCampaign(campaign) {
      this.selectedCampaign = campaign;
      this.selectedAd = null;
    },
    viewAd(ad) {
      this.selectedCampaign = null;
      this.selectedAd = ad;
    },
    clearSelected() {
      this.selectedCampaign = null;
      this.selectedAd = null;
      this.showShareModal = false;
    },
    shareAd() {
      this.showShareModal = true;
      setTimeout(() => {
        this.showShareModal = false;
      }, 3000);
    },
    async logout() {
      localStorage.removeItem("access_token");
      this.$router.push('/');
    },
  },
  created() {
    this.fetchData();
  }
});
export default influencerdashboard;*/

const influencerdashboard = Vue.component("influencerdashboard", {
  props: ['username'],
  data() {
    return {
      campaigns: [],
      ads: [],
      selectedCampaign: null,
      selectedAd: null,
      showShareModal: false,
    };
  },
  template: `
    <div class="container mt-4">
      <h1 class="text-center mb-4">Welcome, {{ username }}</h1>

      <div class="header text-center mb-4">
        <router-link :to="'/userlogin/inf_dash/your_camps/' + username">
          <button class="btn btn-primary m-2">Your Campaigns</button>
        </router-link>
        <router-link :to="'/userlogin/inf_dash/camps/' + username">
          <button class="btn btn-primary m-2">Search Camps</button>
        </router-link>
        <router-link :to="'/userlogin/inf_dash/submit_your_like/' + username">
          <button class="btn btn-primary m-2">Define You</button>
        </router-link>
        <router-link :to="'/userlogin/influencer_dash/send_message/' + username">
          <button class="btn btn-primary m-2">Chat</button>
        </router-link>
        <button @click="logout" class="btn btn-danger m-2">Logout</button>
      </div>

      <div class="content">
        <h3>Active Campaigns:</h3>
        <ul class="list-group mb-4">
          <li v-for="(campaign, index) in campaigns" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            {{ 'Campaign ' + (index + 1) }}
            <button @click="viewCampaign(campaign)" class="btn btn-info btn-sm">View</button>
          </li>
        </ul>

        <h3>Active Ads:</h3>
        <ul class="list-group">
          <li v-for="(ad, index) in ads" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            {{ 'Ad ' + (index + 1) }}
            <button @click="viewAd(ad)" class="btn btn-info btn-sm">View</button>
          </li>
        </ul> 
      </div>

      <!-- Show details of selected campaign -->
      <div v-if="selectedCampaign" class="mt-4">
        <h3>Campaign Details</h3>
        <p><strong>Name:</strong> {{ selectedCampaign.camp_name }}</p>
        <p><strong>Description:</strong> {{ selectedCampaign.description }}</p>
        <p><strong>Start Date:</strong> {{ selectedCampaign.start_date }}</p>
        <p><strong>End Date:</strong> {{ selectedCampaign.end_date }}</p>
        <p><strong>Price:</strong> {{ selectedCampaign.price }}</p>
        <p><strong>Category:</strong> {{ selectedCampaign.category }}</p>
        <p><strong>Creator:</strong> {{ selectedCampaign.creator }}</p>
        <button @click="clearSelected" class="btn btn-secondary">Close</button>
      </div>

      <!-- Show details of selected ad -->
      <div v-if="selectedAd" class="mt-4">
        <h3>Ad Details</h3>
        <p><strong>Name:</strong> {{ selectedAd.ad_name }}</p>
        <p><strong>Details:</strong> {{ selectedAd.ad_details }}</p>
        <p><strong>Camp Name:</strong> {{ selectedAd.camp_name }}</p>
        <p><strong>Creator:</strong> {{ selectedAd.creator }}</p>
        <p><strong>Audience:</strong> {{ selectedAd.audience }}</p>
        <p><strong>Budget:</strong> {{ selectedAd.budget }}</p>
        <p><strong>Duration:</strong> {{ selectedAd.duration }}</p>
        <button @click="clearSelected" class="btn btn-secondary">Close</button>
        <button @click="shareAd" class="btn btn-success">Share</button>
      </div>

      <!-- Modal for ad shared -->
      <div v-if="showShareModal" class="modal-overlay">
        <div class="modal p-4">
          <p>Ad shared successfully.</p>
          <button @click="showShareModal = false" class="btn btn-danger">Close</button>
        </div>
      </div>
    </div>
  `,
  methods: {
    async fetchData() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          this.$router.push('/');
          return;
        }

        const response = await fetch(`/userlogin/inf_dash/${this.username}`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.username !== this.username) {
            alert("Unauthorized access.");
            this.$router.push('/');
            return;
          }
          this.campaigns = data.campaigns;
          this.ads = data.ads;
        } else {
          const error = await response.json();
          alert(error.message);
          if (error.message === "Unauthorized access") {
            this.logout();
          }
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },
    viewCampaign(campaign) {
      this.selectedCampaign = campaign;
      this.selectedAd = null;
    },
    viewAd(ad) {
      this.selectedCampaign = null;
      this.selectedAd = ad;
    },
    clearSelected() {
      this.selectedCampaign = null;
      this.selectedAd = null;
      this.showShareModal = false;
    },
    shareAd() {
      this.showShareModal = true;
      setTimeout(() => {
        this.showShareModal = false;
      }, 3000);
    },
    async logout() {
      localStorage.removeItem("access_token");
      this.$router.push('/');
    },
  },
  created() {
    this.fetchData();
  }
});

export default influencerdashboard;