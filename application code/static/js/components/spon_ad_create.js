/*const sponAdCreate = Vue.component("sponAdCreate", {
    props: ["username"],
    template: `
      <div>
        <h1>Create your ad here</h1>
        <div class="container">
          <form @submit.prevent="submitForm">
            <label for="adName"><strong>Ad Title:</strong></label>
            <input type="text" id="adName" v-model="adName" required><br><br>
  
            <label for="adDescription"><strong>Ad Description:</strong></label>
            <textarea id="adDescription" v-model="adDescription" required></textarea><br><br>
  
            <label for="campName"><strong>Campaign Name:</strong></label>
            <input type="text" id="campName" v-model="campName" required><br><br>
  
            <label for="adAud"><strong>Target Audience:</strong></label>
            <textarea id="adAud" v-model="adAud" required></textarea><br><br>
  
            <label for="adPrice"><strong>Budget:</strong></label>
            <input type="text" id="adPrice" v-model="adPrice" required><br><br>
            
            <label for="adDur"><strong>Duration:</strong></label>
            <input type="text" id="adDur" v-model="adDur"><br><br>
            
            <input type="submit" value="Submit">
          </form>
          <br>
          <br>
          <router-link :to="'/userlogin/spon_dash/' + username">Home</router-link>
        </div>
      </div>
    `,
    data() {
      return {
        adName: "",
        adDescription: "",
        campName: "",
        adAud: "",
        adPrice: "",
        adDur: "",
      };
    },
    methods: {
      async submitForm() {
        const formData = {
          adName: this.adName,
          adDescription: this.adDescription,
          campName: this.campName,
          adAud: this.adAud,
          adPrice: this.adPrice,
          adDur: this.adDur,
        };
        const token = localStorage.getItem("access_token");
        if (!token){
          alert ("youi are not logged in. Please log in again.");
          this.$router.push('/');
          return;
        }
        try {
          const response = await fetch(`/userlogin/spon_dash/create_ad/${this.username}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
          });
  
          if (response.ok) {
            alert("Ad created successfully!");
          } else {
            const error = await response.json();
            alert(error.message);
          }
        } catch (err) {
          console.error("Error:", err);
        }
      },
    },
  });
export default sponAdCreate;*/

const sponAdCreate = Vue.component("sponAdCreate", {
  props: ["username"],
  template: `
    <div class="container mt-5">
      <h1 class="text-center mb-4">Create Your Ad Here</h1>
      
      <div class="bg-light p-4 rounded shadow-sm">
        <form @submit.prevent="submitForm">
          <!-- Ad Title -->
          <div class="mb-3">
            <label for="adName" class="form-label"><strong>Ad Title:</strong></label>
            <input type="text" id="adName" v-model="adName" class="form-control" required>
          </div>

          <!-- Ad Description -->
          <div class="mb-3">
            <label for="adDescription" class="form-label"><strong>Ad Description:</strong></label>
            <textarea id="adDescription" v-model="adDescription" class="form-control" rows="4" required></textarea>
          </div>

          <!-- Campaign Name -->
          <div class="mb-3">
            <label for="campName" class="form-label"><strong>Campaign Name:</strong></label>
            <input type="text" id="campName" v-model="campName" class="form-control" required>
          </div>

          <!-- Target Audience -->
          <div class="mb-3">
            <label for="adAud" class="form-label"><strong>Target Audience:</strong></label>
            <textarea id="adAud" v-model="adAud" class="form-control" rows="3" required></textarea>
          </div>

          <!-- Budget -->
          <div class="mb-3">
            <label for="adPrice" class="form-label"><strong>Budget:</strong></label>
            <input type="text" id="adPrice" v-model="adPrice" class="form-control" required>
          </div>
          
          <!-- Duration -->
          <div class="mb-3">
            <label for="adDur" class="form-label"><strong>Duration:</strong></label>
            <input type="text" id="adDur" v-model="adDur" class="form-control">
          </div>
          
          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>
      </div>
      
      <div class="text-center mt-4">
        <router-link :to="'/userlogin/spon_dash/' + username" class="btn btn-link">Home</router-link>
      </div>
    </div>
  `,
  data() {
    return {
      adName: "",
      adDescription: "",
      campName: "",
      adAud: "",
      adPrice: "",
      adDur: "",
    };
  },
  methods: {
    async submitForm() {
      const formData = {
        adName: this.adName,
        adDescription: this.adDescription,
        campName: this.campName,
        adAud: this.adAud,
        adPrice: this.adPrice,
        adDur: this.adDur,
      };
      const token = localStorage.getItem("access_token");
      if (!token){
        alert ("You are not logged in. Please log in again.");
        this.$router.push('/');
        return;
      }
      try {
        const response = await fetch(`/userlogin/spon_dash/create_ad/${this.username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Ad created successfully!");
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },
  },
});
export default sponAdCreate;