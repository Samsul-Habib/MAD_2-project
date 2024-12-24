/*const sponCampUpdate = Vue.component("sponCampUpdate", {
    props: ['taskId', 'username'],
    template: `
      <div>
        <h1>Update your campaign</h1>
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
            
            <input type="submit" value="Update Campaign">
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
        campaignCategory: ""
      };
    },
    methods: {
      async fetchTaskDetails() {
        const token=localStorage.getItem("access_token");
        if(!token){
          alert("You are not logged in. Please log in again.");
          this.$router.push('/');
          return;
        }
        try {
          const response = await fetch(`/userlogin/spon_dash/update_task/${this.taskId}/${this.username}`,{
            method:'GET',
            headers:{
              'Authorization':`Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            this.campaignName = data.camp_name;
            this.campaignDescription = data.camp_details;
            this.campaignPrice = data.price;
            this.campaignStart = data.start_date;
            this.campaignEnd = data.end_date;
            this.campaignCategory = data.category;
          } else {
            alert("Error fetching task details.");
          }
        } catch (err) {
          console.error("Error:", err);
        }
      },

      async submitForm() {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          this.$router.push('/');
          return;
        }
        const formData = {
          camp_name: this.campaignName,
          camp_details: this.campaignDescription,
          price: this.campaignPrice,
          start_date: this.campaignStart,
          end_date: this.campaignEnd,
          category: this.campaignCategory
        };

        try {
          const response = await fetch(`/userlogin/spon_dash/update_task/${this.taskId}/${this.username}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          });

          if (response.ok) {
            alert("Task updated successfully!");
          } else {
            const error = await response.json();
            alert(error.message);
          }
        } catch (err) {
          console.error("Error:", err);
        }
      }
    },
    created() {
      this.fetchTaskDetails();
    }
});
export default sponCampUpdate;*/

const sponCampUpdate = Vue.component("sponCampUpdate", {
  props: ['taskId', 'username'],
  template: `
    <div class="container mt-5">
      <h1 class="text-center">Update your campaign</h1>
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
            
            <div class="text-center">
              <button type="submit" class="btn btn-primary btn-lg">Update Campaign</button>
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
      campaignCategory: ""
    };
  },
  methods: {
    async fetchTaskDetails() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You are not logged in. Please log in again.");
        this.$router.push('/');
        return;
      }
      try {
        const response = await fetch(`/userlogin/spon_dash/update_task/${this.taskId}/${this.username}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          this.campaignName = data.camp_name;
          this.campaignDescription = data.camp_details;
          this.campaignPrice = data.price;
          this.campaignStart = data.start_date;
          this.campaignEnd = data.end_date;
          this.campaignCategory = data.category;
        } else {
          alert("Error fetching task details.");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },

    async submitForm() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You are not logged in. Please log in again.");
        this.$router.push('/');
        return;
      }
      const formData = {
        camp_name: this.campaignName,
        camp_details: this.campaignDescription,
        price: this.campaignPrice,
        start_date: this.campaignStart,
        end_date: this.campaignEnd,
        category: this.campaignCategory
      };

      try {
        const response = await fetch(`/userlogin/spon_dash/update_task/${this.taskId}/${this.username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert("Task updated successfully!");
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  },
  created() {
    this.fetchTaskDetails();
  }
});

export default sponCampUpdate;

