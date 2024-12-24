/*const InfluSearchCamp = Vue.component("InfluSearchCamp", {
    props: ['username'],
    template: `
      <div class="container" id="container">
        <div class="form-container sign-up">
          <form @submit.prevent="searchCampaigns">
            <h1>Search Campaigns</h1>
  
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
  
          <div v-if="filteredCamps.length > 0" class="campaign-list">
            <h2>Filtered Campaigns</h2>
            <ul>
              <li v-for="camp in filteredCamps" :key="camp.id">
                <p><strong>Camp ID:</strong>    {{ camp.id }}</p>
                <p><strong>Camp Name:</strong>    {{ camp.camp_name }}</p>
                <p><strong>Camp details:</strong>    {{ camp.camp_details }}</p>
                <p><strong>Sponsor:</strong>    {{ camp.sponsor }}</p>
                <p><strong>Price:</strong>    {{ camp.price }}</p>
                <p><strong>Start Date:</strong>    {{ camp.start_date }}</p>
                <p><strong>End Date:</strong>    {{ camp.end_date }}</p>
                <p><strong>Category:</strong>    {{ camp.cat }}</p>

                <button class="accept-btn" @click="acceptCampaign(camp)">Accept</button>
              </li>
            </ul>
          </div>
          <div v-else>
            <p>No campaigns found matching the filters.</p>
          </div>
          <router-link :to="'/userlogin/inf_dash/' + username">Home</router-link>

          <!-- Popup for successful campaign acceptance -->
          <div v-if="showSuccessPopup" class="popup">
            <p>Campaign accepted successfully!</p>
            <button @click="showSuccessPopup = false">OK</button>
          </div>

          <!-- Popup for already accepted campaign -->
          <div v-if="showDuplicatePopup" class="popup">
            <p>This camp has already been accepted.</p>
            <button @click="showDuplicatePopup = false">OK</button>
          </div>

        </div>
      </div>
    `,
    data() {
      return {
        niche: '',
        reach: '',
        followers: '',
        filteredCamps: [],
        showSuccessPopup: false,  // For success message
        showDuplicatePopup: false // For duplicate message
      };
    },
    methods: {
      async searchCampaigns() {
        const token = localStorage.getItem("access_token");
        const searchParams = {
          niche: this.niche,
          reach: this.reach,
          followers: this.followers
        };
  
        try {
          const response = await fetch(`/userlogin/inf_dash/camps/${this.username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(searchParams)
          });
  
          const data = await response.json();
          if (response.ok) {
            this.filteredCamps = data; // Save campaigns to filteredCamps
          } else {
            console.error('Error fetching campaigns:', data.message);
            this.filteredCamps = [];
          }
        } catch (error) {
          console.error('Error:', error);
          this.filteredCamps = [];
        }
      },

      async acceptCampaign(camp) {
        const acceptData = {
          camp_id: camp.id,
          camp_name: camp.camp_name,
          camp_details: camp.camp_details,
          spon_username: camp.sponsor,
          price: camp.price,
          start_date: camp.start_date,
          end_date: camp.end_date,
          category: camp.cat,
          username: this.username
        };

        try {
          const token = localStorage.getItem("access_token");
          const response = await fetch(`/userlogin/inf_dash/camp_accept/${this.username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(acceptData)
          });

          const data = await response.json();
          
          if (response.ok) {
            // Success: Show success popup
            this.showSuccessPopup = true;
            this.showDuplicatePopup = false;  // Hide duplicate popup if open
          } else if (data.message === "already accepted") {
            // Duplicate: Show duplicate popup
            this.showDuplicatePopup = true;
            this.showSuccessPopup = false;  // Hide success popup if open
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  });
  
export default InfluSearchCamp;*/

const InfluSearchCamp = Vue.component("InfluSearchCamp", {
  props: ['username'],
  template: `
    <div class="container mt-5">
      <div class="form-container sign-up bg-light p-4 rounded shadow-sm">
        <form @submit.prevent="searchCampaigns">
          <h1 class="text-center mb-4">Search Campaigns</h1>

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

          <button type="submit" class="btn btn-primary w-100">Search</button>
        </form>

        <div v-if="filteredCamps.length > 0" class="campaign-list mt-4">
          <h2>Filtered Campaigns</h2>
          <ul class="list-group">
            <li v-for="camp in filteredCamps" :key="camp.id" class="list-group-item mb-3">
              <p><strong>Camp ID:</strong> {{ camp.id }}</p>
              <p><strong>Camp Name:</strong> {{ camp.camp_name }}</p>
              <p><strong>Camp details:</strong> {{ camp.camp_details }}</p>
              <p><strong>Sponsor:</strong> {{ camp.sponsor }}</p>
              <p><strong>Price:</strong> {{ camp.price }}</p>
              <p><strong>Start Date:</strong> {{ camp.start_date }}</p>
              <p><strong>End Date:</strong> {{ camp.end_date }}</p>
              <p><strong>Category:</strong> {{ camp.cat }}</p>

              <button class="btn btn-success" @click="acceptCampaign(camp)">Accept</button>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No campaigns found matching the filters.</p>
        </div>

        <!-- Home Button -->
        <div class="text-center mt-4">
          <router-link :to="'/userlogin/inf_dash/' + username" class="btn btn-link">Home</router-link>
        </div>

        <!-- Success Popup -->
        <div v-if="showSuccessPopup" class="popup">
          <div class="alert alert-success mt-3">
            <p>Campaign accepted successfully!</p>
            <button @click="showSuccessPopup = false" class="btn btn-secondary">OK</button>
          </div>
        </div>

        <!-- Duplicate Popup -->
        <div v-if="showDuplicatePopup" class="popup">
          <div class="alert alert-danger mt-3">
            <p>This campaign has already been accepted.</p>
            <button @click="showDuplicatePopup = false" class="btn btn-secondary">OK</button>
          </div>
        </div>

      </div>
    </div>
  `,
  data() {
    return {
      niche: '',
      reach: '',
      followers: '',
      filteredCamps: [],
      showSuccessPopup: false,  // For success message
      showDuplicatePopup: false // For duplicate message
    };
  },
  methods: {
    async searchCampaigns() {
      const token = localStorage.getItem("access_token");
      const searchParams = {
        niche: this.niche,
        reach: this.reach,
        followers: this.followers
      };

      try {
        const response = await fetch(`/userlogin/inf_dash/camps/${this.username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(searchParams)
        });

        const data = await response.json();
        if (response.ok) {
          this.filteredCamps = data; // Save campaigns to filteredCamps
        } else {
          console.error('Error fetching campaigns:', data.message);
          this.filteredCamps = [];
        }
      } catch (error) {
        console.error('Error:', error);
        this.filteredCamps = [];
      }
    },

    async acceptCampaign(camp) {
      const acceptData = {
        camp_id: camp.id,
        camp_name: camp.camp_name,
        camp_details: camp.camp_details,
        spon_username: camp.sponsor,
        price: camp.price,
        start_date: camp.start_date,
        end_date: camp.end_date,
        category: camp.cat,
        username: this.username
      };

      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`/userlogin/inf_dash/camp_accept/${this.username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(acceptData)
        });

        const data = await response.json();
        
        if (response.ok) {
          // Success: Show success popup
          this.showSuccessPopup = true;
          this.showDuplicatePopup = false;  // Hide duplicate popup if open
        } else if (data.message === "already accepted") {
          // Duplicate: Show duplicate popup
          this.showDuplicatePopup = true;
          this.showSuccessPopup = false;  // Hide success popup if open
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
});

export default InfluSearchCamp;

  