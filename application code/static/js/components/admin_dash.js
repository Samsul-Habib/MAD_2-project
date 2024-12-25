/*const admindash = Vue.component("admin_dash", {
  props: ['username'],
  template: `
    <div>
      <h1>Welcome, {{ username }}</h1>
      <div class="header">
        <router-link :to="'/admin/flagged_ads'"><button>Flagged Ads</button></router-link>
        <router-link :to="'/admin/flagged_camps'"><button>Flagged Camps</button></router-link>
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

      <!-- Campaign Details -->
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
        <button @click="flagCampaign(selectedCampaign)">Flag</button>
      </div>

      <!-- Ad Details -->
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
        <button @click="flagAd(selectedAd)">Flag</button>
      </div>
      <div class="summary">
        <h3>Summary</h3>
        <ul>
          <li>Total number of active influencers: {{ total_influencers }}</li>
          <li>Total active sponsors: {{ total_sponsors }}</li>
          <li>Number of ongoing campaigns: {{ total_camps }}</li>
          <li>Number of ongoing ads: {{ total_ads }}</li>
          <li>Number of flagged ads: {{ total_f_ad }}</li>
          <li>Number of flagged campaigns: {{ total_f_camp }}</li>
        </ul>
      </div>
    </div>
  `,
  data() {
    return {
      ads: [],
      campaigns: [],
      selectedCampaign: null,
      selectedAd: null,
      total_influencers: 0,
      total_sponsors: 0,
      total_camps: 0,
      total_ads: 0,
      total_f_ad: 0,
      total_f_camp: 0
    };
  },
  created() {
    this.getAdminDashboard();
  },
  methods: {
    async getAdminDashboard() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          this.$router.push('/');
          return;
        }

        const response = await fetch("/admin/dashboard", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          this.username = data.username;
          this.campaigns = data.campaigns;
          this.ads = data.ads;
          this.total_influencers = data.total_influencers;
          this.total_sponsors = data.total_sponsors;
          this.total_camps = data.total_camps;
          this.total_ads = data.total_ads;
          this.total_f_ad = data.total_f_ad;
          this.total_f_camp = data.total_f_camp;
        } else {
          const error = await response.json();
          console.error("Error fetching dashboard:", error); // Highlighted: Added console log for debugging
          const errorMessage = error.message || "An error occurred. Please try again.";
          alert(errorMessage);
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to fetch data. Please check your network connection.");
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
    },
    async flagCampaign(campaign) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You are not logged in. Please log in again.");
        return;
      }

      try {
        const response = await fetch("/admin/flag_campaign", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: campaign.creator,
            camp_name: campaign.camp_name,
            camp_details: campaign.description,
            price: campaign.price,
            start_date: campaign.start_date,
            end_date: campaign.end_date,
            category: campaign.category,
            expected_reach: campaign.reach,
            expected_followers: campaign.followers
          })
        });

        if (response.ok) {
          alert("Campaign flagged successfully.");
        } else {
          const error = await response.json();
          if (error.message==='Campaign is already flagged.'){
            alert("This camp has already been flagged.");
          }else{
            alert("Error flagging camp:"+error.message);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to flag campaign. Please check your network connection.");
      }
    },
    async flagAd(ad) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You are not logged in. Please log in again.");
        return;
      }

      try {
        const response = await fetch("/admin/flag_ad", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: ad.creator,
            ad_name: ad.ad_name,
            ad_details: ad.ad_details,
            camp_name: ad.camp_name,
            audience: ad.audience,
            budget: ad.budget,
            duration: ad.duration
          })
        });

        if (response.ok) {
          alert("Ad flagged successfully.");
        } else {
          const error = await response.json();
          if (error.message==="Ad is already flagged."){
            alert("This ad has already been flagged.");
          }else{
            alert("Error flagging ad:"+error.message);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to flag ad. Please check your network connection.");
      }
    },
    async logout() {
      localStorage.removeItem("access_token");
        this.$router.push('/');
    }
  }
});
export default admindash;*/

const admindash = Vue.component("admin_dash", {
  props: ['username'],
  template: `
    <div class="container mt-5">
      <h1 class="text-center text-primary mb-4">Welcome, {{ username }}</h1>

      <!-- Navigation Buttons -->
      <div class="d-flex justify-content-between align-items-center my-4">
        <router-link :to="'/admin/flagged_ads'">
          <button class="btn btn-warning btn-lg shadow-sm">Flagged Ads</button>
        </router-link>
        <router-link :to="'/admin/flagged_camps'">
          <button class="btn btn-warning btn-lg shadow-sm">Flagged Camps</button>
        </router-link>
        <button @click="logout" class="btn btn-danger btn-lg shadow-sm">Logout</button>
      </div>

      <!-- Active Campaigns Section -->
      <div class="content mb-4">
        <h3 class="text-primary border-bottom pb-2">Active Campaigns:</h3>
        <ul class="list-group shadow-sm">
          <li 
            v-for="(campaign, index) in campaigns" 
            :key="index" 
            class="list-group-item d-flex justify-content-between align-items-center bg-light border mb-2">
            {{ 'Campaign ' + (index + 1) }}
            <button @click="viewCampaign(campaign)" class="btn btn-info btn-sm shadow-sm">View</button>
          </li>
        </ul>
      </div>

      <!-- Active Ads Section -->
      <div class="content mb-4">
        <h3 class="text-primary border-bottom pb-2">Active Ads:</h3>
        <ul class="list-group shadow-sm">
          <li 
            v-for="(ad, index) in ads" 
            :key="index" 
            class="list-group-item d-flex justify-content-between align-items-center bg-light border mb-2">
            {{ 'Ad ' + (index + 1) }}
            <button @click="viewAd(ad)" class="btn btn-info btn-sm shadow-sm">View</button>
          </li>
        </ul>
      </div>

      <!-- Campaign Details -->
      <div v-if="selectedCampaign" class="card mt-4 shadow-lg">
        <div class="card-header bg-primary text-white">
          <h3>Campaign Details</h3>
        </div>
        <div class="card-body">
          <p><strong>Name:</strong> {{ selectedCampaign.camp_name }}</p>
          <p><strong>Description:</strong> {{ selectedCampaign.description }}</p>
          <p><strong>Start Date:</strong> {{ selectedCampaign.start_date }}</p>
          <p><strong>End Date:</strong> {{ selectedCampaign.end_date }}</p>
          <p><strong>Price:</strong> {{ selectedCampaign.price }}</p>
          <p><strong>Category:</strong> {{ selectedCampaign.category }}</p>
          <p><strong>Creator:</strong> {{ selectedCampaign.creator }}</p>
          <div class="d-flex justify-content-between">
            <button @click="clearSelected" class="btn btn-secondary btn-sm shadow-sm">Close</button>
            <button @click="flagCampaign(selectedCampaign)" class="btn btn-warning btn-sm">Flag</button>
          </div>
        </div>
      </div>

      <!-- Ad Details -->
      <div v-if="selectedAd" class="card mt-4 shadow-lg">
        <div class="card-header bg-primary text-white">
          <h3>Ad Details</h3>
        </div>
        <div class="card-body">
          <p><strong>Name:</strong> {{ selectedAd.ad_name }}</p>
          <p><strong>Details:</strong> {{ selectedAd.ad_details }}</p>
          <p><strong>Camp Name:</strong> {{ selectedAd.camp_name }}</p>
          <p><strong>Creator:</strong> {{ selectedAd.creator }}</p>
          <p><strong>Audience:</strong> {{ selectedAd.audience }}</p>
          <p><strong>Budget:</strong> {{ selectedAd.budget }}</p>
          <p><strong>Duration:</strong> {{ selectedAd.duration }}</p>
          <div class="d-flex justify-content-between">
            <button @click="clearSelected" class="btn btn-secondary btn-sm shadow-sm">Close</button>
            <button @click="flagAd(selectedAd)" class="btn btn-warning btn-sm">Flag</button>
          </div>
        </div>
      </div>

      <!-- Summary Section -->
      <div class="summary card mt-5 shadow-lg">
        <div class="card-header bg-success text-white">
          <h3>Summary</h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center bg-light border mb-2">
              <strong>Total number of active influencers:</strong> {{ total_influencers }}
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-light border mb-2">
              <strong>Total active sponsors:</strong> {{ total_sponsors }}
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-light border mb-2">
              <strong>Number of ongoing campaigns:</strong> {{ total_camps }}
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-light border mb-2">
              <strong>Number of ongoing ads:</strong> {{ total_ads }}
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-light border mb-2">
              <strong>Number of flagged ads:</strong> {{ total_f_ad }}
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-light border mb-2">
              <strong>Number of flagged campaigns:</strong> {{ total_f_camp }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      ads: [],
      campaigns: [],
      selectedCampaign: null,
      selectedAd: null,
      total_influencers: 0,
      total_sponsors: 0,
      total_camps: 0,
      total_ads: 0,
      total_f_ad: 0,
      total_f_camp: 0
    };
  },
  created() {
    this.getAdminDashboard();
  },
  methods: {
    async getAdminDashboard() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          this.$router.push('/');
          return;
        }

        const response = await fetch("/admin/dashboard", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          this.username = data.username;
          this.campaigns = data.campaigns;
          this.ads = data.ads;
          this.total_influencers = data.total_influencers;
          this.total_sponsors = data.total_sponsors;
          this.total_camps = data.total_camps;
          this.total_ads = data.total_ads;
          this.total_f_ad = data.total_f_ad;
          this.total_f_camp = data.total_f_camp;
        } else {
          const error = await response.json();
          console.error("Error fetching dashboard:", error);
          alert(error.message || "An error occurred. Please try again.");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to fetch data. Please check your network connection.");
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
    },
    async flagCampaign(campaign) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You are not logged in. Please log in again.");
        return;
      }

      try {
        const response = await fetch("/admin/flag_campaign", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: campaign.creator,
            camp_name: campaign.camp_name,
            camp_details: campaign.description,
            price: campaign.price,
            start_date: campaign.start_date,
            end_date: campaign.end_date,
            category: campaign.category,
            expected_reach: campaign.reach,
            expected_followers: campaign.followers
          })
        });

        if (response.ok) {
          alert("Campaign flagged successfully.");
        } else {
          const error = await response.json();
          if (error.message==='Campaign is already flagged.'){
            alert("This camp has already been flagged.");
          }else{
            alert("Error flagging camp:"+error.message);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to flag campaign. Please check your network connection.");
      }
    },
    async flagAd(ad) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You are not logged in. Please log in again.");
        return;
      }

      try {
        const response = await fetch("/admin/flag_ad", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: ad.creator,
            ad_name: ad.ad_name,
            ad_details: ad.ad_details,
            camp_name: ad.camp_name,
            audience: ad.audience,
            budget: ad.budget,
            duration: ad.duration
          })
        });

        if (response.ok) {
          alert("Ad flagged successfully.");
        } else {
          const error = await response.json();
          if (error.message==="Ad is already flagged."){
            alert("This ad has already been flagged.");
          }else{
            alert("Error flagging ad:"+error.message);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to flag ad. Please check your network connection.");
      }
    },
    async logout() {
      localStorage.removeItem("access_token");
      this.$router.push('/');
    }
  }
});
export default admindash;