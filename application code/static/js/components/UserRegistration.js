/*const userRegistration = Vue.component("userRegistration", {
    template: `
      <div>
        <div class="container" id="container">
          <div class="form-container sign-up">
            <form @submit.prevent="userRegistration">
              <h1>User Registration</h1>
              
              <label for="username">Username:</label>
              <input type="text" v-model="username" placeholder="User name" required>
              
              <label for="email">Email:</label>
              <input type="email" v-model="email" placeholder="Email" required>
              
              <label for="password">Password:</label>
              <input type="password" v-model="password" placeholder="Password" required>
              
              <label for="industry">Industry:</label>
              <input type="text" v-model="industry" placeholder="Industry (Optional)">
              
              <label for="role">Select Role:</label>
              <select v-model="role" required>
                <option value="influencer">Influencer</option>
                <option value="sponsor">Sponsor</option>
              </select>
              
              <button type="submit">Register</button>
            </form>
            <div class="footer-links">
              <strong>Already a user?</strong> <router-link to="/userlogin">Login</router-link><br>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        username: "",
        email: "",
        password: "",
        industry: "",
        role: ""
      };
    },
    methods: {
      async userRegistration() {
        try {
          const response = await fetch("/userlogin/sign_up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password,
              industry: this.industry,
              role: this.role
            })
          });
  
          if (response.ok) {
            const data = await response.json();
            alert("Registration successful!");
            // You can redirect the user to login or perform other actions here
          } else {
            const error = await response.json();
            alert(error.message); // Display the error message
          }
        } catch (err) {
          console.error("Error:", err);
        }
      }
    }
  });
  
  export default userRegistration;*/

  const userRegistration = Vue.component("userRegistration", {
    template: `
      <div>
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card shadow-lg">
                <div class="card-body">
                  <h1 class="text-center mb-4">User Registration</h1>
                  
                  <form @submit.prevent="userRegistration">
                    <div class="form-group mb-3">
                      <label for="username"><strong>Username:</strong></label>
                      <input type="text" v-model="username" class="form-control" placeholder="Enter your username" required>
                    </div>
                    
                    <div class="form-group mb-3">
                      <label for="email"><strong>Email:</strong></label>
                      <input type="email" v-model="email" class="form-control" placeholder="Enter your email" required>
                    </div>
  
                    <div class="form-group mb-3">
                      <label for="password"><strong>Password:</strong></label>
                      <input type="password" v-model="password" class="form-control" placeholder="Enter your password" required>
                    </div>
  
                    <div class="form-group mb-3">
                      <label for="industry"><strong>Industry (Optional):</strong></label>
                      <input type="text" v-model="industry" class="form-control" placeholder="Enter your industry (Optional)">
                    </div>
  
                    <div class="form-group mb-4">
                      <label for="role"><strong>Select Role:</strong></label>
                      <select v-model="role" class="form-control" required>
                        <option value="influencer">Influencer</option>
                        <option value="sponsor">Sponsor</option>
                      </select>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">Register</button>
                  </form>
                  
                  <div class="footer-links mt-3 text-center">
                    <strong>Already a user?</strong> <router-link to="/userlogin">Login</router-link><br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        username: "",
        email: "",
        password: "",
        industry: "",
        role: ""
      };
    },
    methods: {
      async userRegistration() {
        try {
          const response = await fetch("/userlogin/sign_up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password,
              industry: this.industry,
              role: this.role
            })
          });
  
          if (response.ok) {
            const data = await response.json();
            alert("Registration successful!");
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
  
export default userRegistration;  
  