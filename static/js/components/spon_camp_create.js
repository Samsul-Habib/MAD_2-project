/*const sponCampCreate = Vue.component("sponCampCreate", {
  props: ['username', 'campaignId'], // Add campaignId prop
  template: `
    <div>
      <h1>{{ campaignId ? 'Update your camp here' : 'Create your camp here' }}</h1>
      <div class="container">
        <form @submit.prevent="submitForm">
          <label for="campaignName"><strong>Campaign Name:</strong></label>
          <input type="text" id="campaignName" v-model="campaignName" required><br><br>
          
          <label for="campaignDescription"><strong>Campaign Description:</strong></label>
          <textarea id="campaignDescription" v-model="campaignDescription" required></textarea><br><br>
          
          <label for="campaignPrice"><strong>Price offered:</strong></label>
          <input type="text" id="campaignPrice" v-model="campaignPrice" required><br><br>
          
          <label for="campaignStart"><strong>Start Date:</strong></label>
          <input type="text" id="campaignStart" v-model="campaignStart"><br><br>
          
          <label for="campaignEnd"><strong>End Date:</strong></label>
          <input type="text" id="campaignEnd" v-model="campaignEnd"><br><br>
          
          <label for="campaignCategory"><strong>Category:</strong></label>
          <select id="campaignCategory" v-model="campaignCategory" required>
            <option value="fashion">Fashion</option>
            <option value="fitness">Fitness</option>
            <option value="tech">Technology</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
          </select><br><br>
          
          <label for="campaignReach"><strong>Expected reach of the influencer:</strong></label>
          <select id="campaignReach" v-model="campaignReach" required>
            <option value="1000-10,000">Nano (1000-10,000)</option>
            <option value="10,000-50,000">Micro (10,000-50,000)</option>
            <option value="50,000-500,000">Mid-Tier (50,000-500,000)</option>
            <option value="500,000-1,000,000">Macro (500,000-1,000,000)</option>
            <option value="1,000,000+">Mega (1,000,000+)</option>
          </select><br><br>
          
          <label for="campaignFollowers"><strong>Select followers:</strong></label>
          <select id="campaignFollowers" v-model="campaignFollowers" required>
            <option value="1,000-5,000">1,000-5,000</option>
            <option value="5,001-20,000">5,001-20,000</option>
            <option value="20,001-50,000">20,001-50,000</option>
            <option value="50,001-100,000">50,001-100,000</option>
            <option value="100,000+">100,000+</option>
          </select><br><br>
          
          <input type="submit" value="Submit">
        </form>
        <br><br>
        <router-link :to="'/userlogin/spon_dash/'+username">Home</router-link>
      </div>
    </div>
  `,
  data() {
    return {
      campaignName: "",
      campaignDescription: "",
      campaignPrice: "",
      campaignStart: "",
      campaignEnd: "",
      campaignCategory: "",
      campaignReach: "",
      campaignFollowers: ""
    };
  },
  created() {
    if (this.campaignId) {
      this.fetchCampaignData();
    }
  },
  methods: {
    async fetchCampaignData() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          this.$router.push('/');
          return;
        }
        const response = await fetch(`/userlogin/spon_dash/get_campaign/${this.campaignId}`);
        if (response.ok) {
          const data = await response.json();
          this.campaignName = data.campaignName;
          this.campaignDescription = data.campaignDescription;
          this.campaignPrice = data.campaignPrice;
          this.campaignStart = data.campaignStart;
          this.campaignEnd = data.campaignEnd;
          this.campaignCategory = data.campaignCategory;
          this.campaignReach = data.campaignReach;
          this.campaignFollowers = data.campaignFollowers;
        } else {
          alert("Error fetching campaign data.");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },
    async submitForm() {
      const formData = {
        campaignName: this.campaignName,
        campaignDescription: this.campaignDescription,
        campaignPrice: this.campaignPrice,
        campaignStart: this.campaignStart,
        campaignEnd: this.campaignEnd,
        campaignCategory: this.campaignCategory,
        campaignReach: this.campaignReach,
        campaignFollowers: this.campaignFollowers
      };
      
      const url = this.campaignId
        ? `/userlogin/spon_dash/update_task/${this.campaignId}` // Update endpoint
        : `/userlogin/spon_dash/create_task/${this.username}`; // Create endpoint

      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          this.$router.push('/');
          return;}
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert("Campaign " + (this.campaignId ? "updated" : "created") + " successfully!");
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
});

export default sponCampCreate;*/

const sponCampCreate = Vue.component("sponCampCreate", {
  props: ['username', 'campaignId'], // Add campaignId prop
  template: `
    <div class="container mt-5">
      <h1 class="text-center">{{ campaignId ? 'Update your camp here' : 'Create your camp here' }}</h1>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <form @submit.prevent="submitForm" class="border p-4 rounded shadow-sm">
            <div class="mb-3">
              <label for="campaignName" class="form-label"><strong>Campaign Name:</strong></label>
              <input type="text" id="campaignName" v-model="campaignName" class="form-control" required><br>
            </div>
            
            <div class="mb-3">
              <label for="campaignDescription" class="form-label"><strong>Campaign Description:</strong></label>
              <textarea id="campaignDescription" v-model="campaignDescription" class="form-control" required></textarea><br>
            </div>
            
            <div class="mb-3">
              <label for="campaignPrice" class="form-label"><strong>Price offered:</strong></label>
              <input type="text" id="campaignPrice" v-model="campaignPrice" class="form-control" required><br>
            </div>
            
            <div class="mb-3">
              <label for="campaignStart" class="form-label"><strong>Start Date:</strong></label>
              <input type="date" id="campaignStart" v-model="campaignStart" class="form-control"><br>
            </div>
            
            <div class="mb-3">
              <label for="campaignEnd" class="form-label"><strong>End Date:</strong></label>
              <input type="date" id="campaignEnd" v-model="campaignEnd" class="form-control"><br>
            </div>
            
            <div class="mb-3">
              <label for="campaignCategory" class="form-label"><strong>Category:</strong></label>
              <select id="campaignCategory" v-model="campaignCategory" class="form-select" required>
                <option value="fashion">Fashion</option>
                <option value="fitness">Fitness</option>
                <option value="tech">Technology</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
              </select><br>
            </div>
            
            <div class="mb-3">
              <label for="campaignReach" class="form-label"><strong>Expected reach of the influencer:</strong></label>
              <select id="campaignReach" v-model="campaignReach" class="form-select" required>
                <option value="1000-10,000">Nano (1000-10,000)</option>
                <option value="10,000-50,000">Micro (10,000-50,000)</option>
                <option value="50,000-500,000">Mid-Tier (50,000-500,000)</option>
                <option value="500,000-1,000,000">Macro (500,000-1,000,000)</option>
                <option value="1,000,000+">Mega (1,000,000+)</option>
              </select><br>
            </div>
            
            <div class="mb-3">
              <label for="campaignFollowers" class="form-label"><strong>Select followers:</strong></label>
              <select id="campaignFollowers" v-model="campaignFollowers" class="form-select" required>
                <option value="1,000-5,000">1,000-5,000</option>
                <option value="5,001-20,000">5,001-20,000</option>
                <option value="20,001-50,000">20,001-50,000</option>
                <option value="50,001-100,000">50,001-100,000</option>
                <option value="100,000+">100,000+</option>
              </select><br>
            </div>
            
            <div class="text-center">
              <button type="submit" class="btn btn-primary btn-lg">{{ campaignId ? 'Update Campaign' : 'Create Campaign' }}</button>
            </div>
          </form>
          <br>
          <router-link :to="'/userlogin/spon_dash/'+username" class="btn btn-secondary">Back to Dashboard</router-link>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      campaignName: "",
      campaignDescription: "",
      campaignPrice: "",
      campaignStart: "",
      campaignEnd: "",
      campaignCategory: "",
      campaignReach: "",
      campaignFollowers: ""
    };
  },
  created() {
    if (this.campaignId) {
      this.fetchCampaignData();
    }
  },
  methods: {
    async fetchCampaignData() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          this.$router.push('/');
          return;
        }
        const response = await fetch(`/userlogin/spon_dash/get_campaign/${this.campaignId}`);
        if (response.ok) {
          const data = await response.json();
          this.campaignName = data.campaignName;
          this.campaignDescription = data.campaignDescription;
          this.campaignPrice = data.campaignPrice;
          this.campaignStart = data.campaignStart;
          this.campaignEnd = data.campaignEnd;
          this.campaignCategory = data.campaignCategory;
          this.campaignReach = data.campaignReach;
          this.campaignFollowers = data.campaignFollowers;
        } else {
          alert("Error fetching campaign data.");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },
    async submitForm() {
      const formData = {
        campaignName: this.campaignName,
        campaignDescription: this.campaignDescription,
        campaignPrice: this.campaignPrice,
        campaignStart: this.campaignStart,
        campaignEnd: this.campaignEnd,
        campaignCategory: this.campaignCategory,
        campaignReach: this.campaignReach,
        campaignFollowers: this.campaignFollowers
      };
      
      const url = this.campaignId
        ? `/userlogin/spon_dash/update_task/${this.campaignId}` // Update endpoint
        : `/userlogin/spon_dash/create_task/${this.username}`; // Create endpoint

      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          this.$router.push('/');
          return;
        }
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert("Campaign " + (this.campaignId ? "updated" : "created") + " successfully!");
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
});

export default sponCampCreate;




