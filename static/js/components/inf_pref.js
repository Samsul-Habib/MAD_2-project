/*const influencerPreference = Vue.component("influencerPreference", {
    props: ['username'],
    template: `
      <div class="container">
        <div class="form-container">
          <form @submit.prevent="submitPreferences">
            <h1>Submit your preferences here</h1>
  
            <label for="niche"><strong>Select Preferences:</strong></label>
            <select v-model="preferences.niche" id="niche" required>
              <option value="fashion">Fashion</option>
              <option value="fitness">Fitness</option>
              <option value="tech">Technology</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
            </select>
            <br>
  
            <label for="reach"><strong>Select your reach:</strong></label>
            <select v-model="preferences.reach" id="reach" required>
              <option value="1000-10,000">Nano (1000-10,000)</option>
              <option value="10,000-50,000">Micro (10,000-50,000)</option>
              <option value="50,000-500,000">Mid-Tier (50,000-500,000)</option>
              <option value="500,000-1,000,000">Macro (500,000-1,000,000)</option>
              <option value="1,000,000+">Mega (1,000,000+ )</option>
            </select>
            <br>
  
            <label for="followers"><strong>Select your followers:</strong></label>
            <select v-model="preferences.followers" id="followers" required>
              <option value="1,000-5,000">1,000-5,000</option>
              <option value="5,001-20,000">5,001-20,000</option>
              <option value="20,001-50,000">20,001-50,000</option>
              <option value="50,001-100,000">50,001-100,000</option>
              <option value="100,000+">100,000+</option>
            </select>
            <br>
  
            <label for="motto"><strong>Your motto:</strong></label>
            <textarea v-model="preferences.motto" id="motto" required></textarea><br><br>
  
            <label for="exp"><strong>Prior experiences:</strong></label>
            <textarea v-model="preferences.exp" id="exp" required></textarea><br><br>
  
            <button type="submit">Submit</button>
          </form>
  
          <div class="footer-links">
            <router-link :to="'/userlogin/inf_dash/' + username">Home</router-link><br>
          </div>
        </div>
  
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0; 
          }
          .container {
            text-align: center;
          }
          .form-container {
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          input, select, textarea {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            box-sizing: border-box;
          }
          button {
            padding: 10px 20px;
            margin: 10px 0;
            font-size: 18px;
            border: none;
            cursor: pointer;
            background-color: #4CAF50;
            color: white;
          }
        </style>
      </div>
    `,
    data() {
      return {
        preferences: {
          niche: '',
          reach: '',
          followers: '',
          motto: '',
          exp: ''
        }
      };
    },
    methods: {
      async submitPreferences() {
        try {
          const token = localStorage.getItem("access_token");
          const response = await fetch(`/userlogin/inf_dash/submit_your_like/${this.username}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
            body: JSON.stringify(this.preferences)
          });
          if (response.ok) {
            alert('Preferences submitted successfully!');
          } else {
            alert('Error submitting preferences.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  });
  
export default influencerPreference;*/

const influencerPreference = Vue.component("influencerPreference", {
  props: ['username'],
  template: `
    <div class="container mt-5">
      <div class="form-container p-4 shadow-sm rounded bg-white">
        <form @submit.prevent="submitPreferences">
          <h1 class="text-center mb-4">Submit Your Preferences</h1>

          <div class="mb-3">
            <label for="niche" class="form-label"><strong>Select Preferences:</strong></label>
            <select v-model="preferences.niche" id="niche" class="form-select" required>
              <option value="fashion">Fashion</option>
              <option value="fitness">Fitness</option>
              <option value="tech">Technology</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="reach" class="form-label"><strong>Select Your Reach:</strong></label>
            <select v-model="preferences.reach" id="reach" class="form-select" required>
              <option value="1000-10,000">Nano (1000-10,000)</option>
              <option value="10,000-50,000">Micro (10,000-50,000)</option>
              <option value="50,000-500,000">Mid-Tier (50,000-500,000)</option>
              <option value="500,000-1,000,000">Macro (500,000-1,000,000)</option>
              <option value="1,000,000+">Mega (1,000,000+ )</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="followers" class="form-label"><strong>Select Your Followers:</strong></label>
            <select v-model="preferences.followers" id="followers" class="form-select" required>
              <option value="1,000-5,000">1,000-5,000</option>
              <option value="5,001-20,000">5,001-20,000</option>
              <option value="20,001-50,000">20,001-50,000</option>
              <option value="50,001-100,000">50,001-100,000</option>
              <option value="100,000+">100,000+</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="motto" class="form-label"><strong>Your Motto:</strong></label>
            <textarea v-model="preferences.motto" id="motto" class="form-control" rows="3" required></textarea>
          </div>

          <div class="mb-3">
            <label for="exp" class="form-label"><strong>Prior Experiences:</strong></label>
            <textarea v-model="preferences.exp" id="exp" class="form-control" rows="3" required></textarea>
          </div>

          <button type="submit" class="btn btn-success w-100">Submit</button>
        </form>

        <div class="footer-links mt-3 text-center">
          <router-link :to="'/userlogin/inf_dash/' + username" class="btn btn-link">Home</router-link><br>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      preferences: {
        niche: '',
        reach: '',
        followers: '',
        motto: '',
        exp: ''
      }
    };
  },
  methods: {
    async submitPreferences() {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`/userlogin/inf_dash/submit_your_like/${this.username}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(this.preferences)
        });
        if (response.ok) {
          alert('Preferences submitted successfully!');
        } else {
          alert('Error submitting preferences.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
});

export default influencerPreference;
  