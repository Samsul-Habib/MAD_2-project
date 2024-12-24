/*const ChosenCampaigns = Vue.component("ChosenCampaigns", {
    props: ['influencerCamps', 'flaggedCamps', 'username'],
    data() {
        return {
          influencerCamps: [],
          flaggedCamps: [],
          username: '',
        };
      },
      created() {
        this.fetchCampaignData();
      },
      methods: {
        async fetchCampaignData() {
          const token = localStorage.getItem("access_token");
          try {
            const response = await fetch(`/userlogin/inf_dash/your_camps/${this.$route.params.username}`,{
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }); 
            const data = await response.json();
            this.influencerCamps = data.influencer_camps;
            this.flaggedCamps = data.flagged_camps;
            this.username = data.username;
          } catch (error) {
            console.error('Error fetching campaign data:', error);
          }
        },
        async deleteCampaign(camp_id) {
          const token = localStorage.getItem("access_token");
          try {
          const response = await fetch(`/userlogin/inf_dash/your_camps/delete/${camp_id}/${this.username}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`
              }
          });
  
          if (response.ok) {
                // Remove the deleted campaign from the UI
                //this.influencerCamps = this.influencerCamps.filter(campaign => campaign.camp_id !== camp_id);
                this.influencerCamps = this.influencerCamps.filter(campaign => campaign.camp_id !== camp_id);
                alert('Campaign deleted successfully');
          } else {
                const data = await response.json();
                alert(data.message);
          }
          } catch (error) {
            console.error('Error deleting campaign:', error);
          }
        }
      },
      template: `
      <div>
        <h1 style="text-align: center;">These are your chosen campaigns.</h1>
        <ul>
          <div v-for="campaign in influencerCamps" :key="campaign.camp_id" class="container">
            <li>
              <p><strong>Campaign ID:</strong> {{ campaign.camp_id }}</p>
              <p><strong>Sponsor user name:</strong> {{ campaign.spon_username }}</p>
              <p><strong>Name of the Campaign:</strong> {{ campaign.camp_name }}</p>
              <p><strong>Details of the Campaign:</strong> {{ campaign.camp_details }}</p>
              <p><strong>Price offered:</strong> {{ campaign.price }}</p>
              <p><strong>Start Date:</strong> {{ campaign.start_date }}</p>
              <p><strong>End Date:</strong> {{ campaign.end_date }}</p>
              <p><strong>Category:</strong> {{ campaign.category }}</p>
            </li>
            <div class="button-container">
              <div class="button-wrapper">
                <button @click="deleteCampaign(campaign.camp_id)" class="view-button">Reject</button>
              </div>
            </div>
            <!-- Flagged campaign notice -->
            <p v-if="flaggedCamps.includes(campaign.camp_name)" style="color:red;">
              *This camp has been flagged by the admin.
            </p>
          </div>
        </ul>
        <!-- Home button -->
        <div class="button-wrapper">
          <router-link :to="'/userlogin/inf_dash/' + username">Home</router-link>
        </div>
      </div>
    `
  });
  
export default ChosenCampaigns;*/

const ChosenCampaigns = Vue.component("ChosenCampaigns", {
  props: ['influencerCamps', 'flaggedCamps', 'username'],
  data() {
      return {
        influencerCamps: [],
        flaggedCamps: [],
        username: '',
      };
    },
    created() {
      this.fetchCampaignData();
    },
    methods: {
      async fetchCampaignData() {
        const token = localStorage.getItem("access_token");
        try {
          const response = await fetch(`/userlogin/inf_dash/your_camps/${this.$route.params.username}`,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }); 
          const data = await response.json();
          this.influencerCamps = data.influencer_camps;
          this.flaggedCamps = data.flagged_camps;
          this.username = data.username;
        } catch (error) {
          console.error('Error fetching campaign data:', error);
        }
      },
      async deleteCampaign(camp_id) {
        const token = localStorage.getItem("access_token");
        try {
        const response = await fetch(`/userlogin/inf_dash/your_camps/delete/${camp_id}/${this.username}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
              // Remove the deleted campaign from the UI
              this.influencerCamps = this.influencerCamps.filter(campaign => campaign.camp_id !== camp_id);
              alert('Campaign deleted successfully');
        } else {
              const data = await response.json();
              alert(data.message);
        }
        } catch (error) {
          console.error('Error deleting campaign:', error);
        }
      }
    },
    template: `
    <div class="container mt-5">
      <h1 class="text-center mb-4">These are your chosen campaigns</h1>

      <div v-for="campaign in influencerCamps" :key="campaign.camp_id" class="card mb-4 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">{{ campaign.camp_name }}</h5>
          <p><strong>Campaign ID:</strong> {{ campaign.camp_id }}</p>
          <p><strong>Sponsor Username:</strong> {{ campaign.spon_username }}</p>
          <p><strong>Details of the Campaign:</strong> {{ campaign.camp_details }}</p>
          <p><strong>Price Offered:</strong> {{ campaign.price }}</p>
          <p><strong>Start Date:</strong> {{ campaign.start_date }}</p>
          <p><strong>End Date:</strong> {{ campaign.end_date }}</p>
          <p><strong>Category:</strong> {{ campaign.category }}</p>
          
          <!-- Flagged campaign notice -->
          <p v-if="flaggedCamps.includes(campaign.camp_name)" class="text-danger">
            *This campaign has been flagged by the admin.
          </p>

          <div class="d-flex justify-content-end">
            <button @click="deleteCampaign(campaign.camp_id)" class="btn btn-danger">Reject</button>
          </div>
        </div>
      </div>

      <!-- Home button -->
      <div class="text-center mt-4">
        <router-link :to="'/userlogin/inf_dash/' + username" class="btn btn-link">Home</router-link>
      </div>
    </div>
  `
});

export default ChosenCampaigns;