/*const flaggedCampaignDetails = Vue.component("flaggedCampaignDetails", {
    data() {
      return {
        campaigns: [], // Array to hold flagged campaigns
        username: this.$route.params.username // Assuming username is passed as a route param
      };
    },
    created() {
      this.getFlaggedCampaigns(); // Fetch flagged campaigns on component creation
    },
    methods: {
      async getFlaggedCampaigns() {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          return;
        }
  
        try {
          const response = await fetch("/admin/flagged_camps", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
  
          if (response.ok) {
            this.campaigns = await response.json();
          } else {
            const error = await response.json();
            alert("Error fetching flagged campaigns: " + error.message);
          }
        } catch (err) {
          console.error("Error:", err);
          alert("Failed to fetch flagged campaigns. Please check your network connection.");
        }
      },
      async unflagCampaign(campaignId) {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          return;
        }
  
        try {
          const response = await fetch(`/admin/unflag_campaign/${campaignId}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
  
          if (response.ok) {
            alert("Campaign unflagged successfully.");
            this.getFlaggedCampaigns(); // Refresh the list after unflagging
          } else {
            const error = await response.json();
            alert("Error unflagging campaign: " + error.message);
          }
        } catch (err) {
          console.error("Error:", err);
          alert("Failed to unflag campaign. Please check your network connection.");
        }
      }
    },
    template: `
      <div>
        <h1>Flagged Campaigns</h1>
        <div v-for="campaign in campaigns" :key="campaign.id" class="container">
          <p><strong>Name of the Campaign:</strong> {{ campaign.camp_name }}</p>
          <p><strong>Campaign created by:</strong> {{ campaign.username }}</p>
          <p><strong>Details of the Campaign:</strong> {{ campaign.camp_details }}</p>
          <p><strong>Start Date:</strong> {{ campaign.start_date }}</p>
          <p><strong>End Date:</strong> {{ campaign.end_date }}</p>
          <p><strong>Price:</strong> {{ campaign.price }}</p>
          <p><strong>Category:</strong> {{ campaign.category }}</p>
          <button @click="unflagCampaign(campaign.id)">Unflag</button>
        </div>
      </div>
    `
  });
  
export default flaggedCampaignDetails;*/

const flaggedCampaignDetails = Vue.component("flaggedCampaignDetails", {
  data() {
      return {
          campaigns: [], // Array to hold flagged campaigns
          username: this.$route.params.username // Assuming username is passed as a route param
      };
  },
  created() {
      this.getFlaggedCampaigns(); // Fetch flagged campaigns on component creation
  },
  methods: {
      async getFlaggedCampaigns() {
          const token = localStorage.getItem("access_token");
          if (!token) {
              alert("You are not logged in. Please log in again.");
              return;
          }

          try {
              const response = await fetch("/admin/flagged_camps", {
                  method: "GET",
                  headers: {
                      "Authorization": `Bearer ${token}`
                  }
              });

              if (response.ok) {
                  this.campaigns = await response.json();
              } else {
                  const error = await response.json();
                  alert("Error fetching flagged campaigns: " + error.message);
              }
          } catch (err) {
              console.error("Error:", err);
              alert("Failed to fetch flagged campaigns. Please check your network connection.");
          }
      },
      async unflagCampaign(campaignId) {
          const token = localStorage.getItem("access_token");
          if (!token) {
              alert("You are not logged in. Please log in again.");
              return;
          }

          try {
              const response = await fetch(`/admin/unflag_campaign/${campaignId}`, {
                  method: "DELETE",
                  headers: {
                      "Authorization": `Bearer ${token}`
                  }
              });

              if (response.ok) {
                  alert("Campaign unflagged successfully.");
                  this.getFlaggedCampaigns(); // Refresh the list after unflagging
              } else {
                  const error = await response.json();
                  alert("Error unflagging campaign: " + error.message);
              }
          } catch (err) {
              console.error("Error:", err);
              alert("Failed to unflag campaign. Please check your network connection.");
          }
      }
  },
  template: `
    <div class="container mt-5">
      <h1 class="text-center mb-4">Flagged Campaigns</h1>

      <div v-for="campaign in campaigns" :key="campaign.id" class="card mb-4 shadow-sm">
        <div class="card-header bg-danger text-white">
          <h5 class="mb-0">Campaign Information</h5>
        </div>
        <div class="card-body">
          <p><strong>Name of the Campaign:</strong> {{ campaign.camp_name }}</p>
          <p><strong>Campaign created by:</strong> {{ campaign.username }}</p>
          <p><strong>Details of the Campaign:</strong> {{ campaign.camp_details }}</p>
          <p><strong>Start Date:</strong> {{ campaign.start_date }}</p>
          <p><strong>End Date:</strong> {{ campaign.end_date }}</p>
          <p><strong>Price:</strong> {{ campaign.price }}</p>
          <p><strong>Category:</strong> {{ campaign.category }}</p>
          <button @click="unflagCampaign(campaign.id)" class="btn btn-warning">Unflag</button>
        </div>
      </div>
    </div>
  `
});

export default flaggedCampaignDetails;
  