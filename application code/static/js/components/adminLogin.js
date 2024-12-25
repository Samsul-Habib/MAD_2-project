/*const adminlogin = Vue.component("adminlogin", {
  template: `
    <div class="container" id="container">
      <div class="form-container sign-up">
        <form @submit.prevent="adminLogin">
          <h1>Admin Login</h1>
          <label for="username"><strong>Username:</strong></label>
          <input type="text" v-model="username" placeholder="User name" required>
          <label for="password"><strong>Password:</strong></label>
          <input type="password" v-model="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
        <!--<div class="footer-links">
          <strong>New user?</strong> <a href="/adminlogin/sign_up">Sign Up</a><br>
          <strong>Forgot</strong> <a href="/adminlogin/reset_password">Password?</a>
        </div>-->
      </div>
      <!--<div class="user-login-link">
        <a href="/userlogin">
          <h2><strong>User login</strong></h2>
        </a>
      </div>-->
    </div>
  `,
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async adminLogin() {
      try {
        const response = await fetch("/adminlogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        
        

        if (response.ok) {
          const data = await response.json();
          alert(data.message); // "Hi Admin!" message
          localStorage.setItem("access_token", data.access_token);
          this.$router.push({name:'admin_dash'});
        } else {
          const error = await response.json();
          alert(error.message); // Error message (e.g., "Invalid password" or "User not found")
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
});

export default adminlogin;*/

const adminlogin = Vue.component("adminlogin", {
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-lg">
            <div class="card-body">
              <h1 class="text-center mb-4">Admin Login</h1>
              
              <form @submit.prevent="adminLogin">
                <div class="form-group mb-3">
                  <label for="username"><strong>Username:</strong></label>
                  <input type="text" v-model="username" class="form-control" placeholder="Enter your username" required>
                </div>
                <div class="form-group mb-4">
                  <label for="password"><strong>Password:</strong></label>
                  <input type="password" v-model="password" class="form-control" placeholder="Enter your password" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
          
          <!--<div class="footer-links mt-3 text-center">
            <strong>New user?</strong> <a href="/adminlogin/sign_up">Sign Up</a><br>
            <strong>Forgot</strong> <a href="/adminlogin/reset_password">Password?</a>
          </div>-->
        </div>
      </div>
      <!--<div class="user-login-link text-center mt-4">
        <a href="/userlogin">
          <h2><strong>User login</strong></h2>
        </a>
      </div>-->
    </div>
  `,
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async adminLogin() {
      try {
        const response = await fetch("/adminlogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message); // "Hi Admin!" message
          localStorage.setItem("access_token", data.access_token);
          this.$router.push({ name: 'admin_dash' });
        } else {
          const error = await response.json();
          alert(error.message); // Error message (e.g., "Invalid password" or "User not found")
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
});

export default adminlogin;