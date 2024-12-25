/*const userLogin = Vue.component("userLogin", {
    template: `
      <div>
        <div class="container" id="container">
          <div class="form-container sign-up">
            <form @submit.prevent="userLogin">
              <h1>User Login</h1>
              
              <label for="username"><strong>Username:</strong></label>
              <input type="text" v-model="username" placeholder="User name" required>
              
              <label for="password"><strong>Password:</strong></label>
              <input type="password" v-model="password" placeholder="Password" required>
              
              <label for="role"><strong>Select Role:</strong></label>
              <select v-model="role" required>
                <option value="influencer">Influencer</option>
                <option value="sponsor">Sponsor</option>
              </select>
              
              <button type="submit">Login</button>
            </form>
  
            <div class="footer-links">
              <strong>New user?</strong> <router-link to="/userlogin/sign_up">Register</router-link><br>
            </div>
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
            width: 400px;
            max-width: 90%;
          }
          form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          input, select {
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
          .admin-login-link {
            position: absolute;
            bottom: 20px;
            text-align: center;
            width: 100%;
          }
          .admin-login-link h2 {
            margin: 0;
          }
        </style>
      </div>
    `,
    data() {
      return {
        username: "",
        password: "",
        role: "",
        errorMessage:""
      };
    },
    methods: {
      async userLogin() {
        try {
          const response = await fetch("/userlogin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
              role: this.role
            })
          });
  
          if (response.ok) {
            const data = await response.json();
            alert("Login successful!");
            localStorage.setItem("access_token", data.access_token);
            if (data.role==='influencer'){
              this.$router.push(`/userlogin/inf_dash/${data.username}`);
            } else if (data.role==='sponsor'){
              this.$router.push(`/userlogin/spon_dash/${data.username}`);
            }
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
  
export default userLogin;*/

const userLogin = Vue.component("userLogin", {
  template: `
    <div>
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card shadow-lg">
              <div class="card-body">
                <h1 class="text-center mb-4">User Login</h1>
                
                <form @submit.prevent="userLogin">
                  <div class="form-group mb-3">
                    <label for="username"><strong>Username:</strong></label>
                    <input type="text" v-model="username" class="form-control" placeholder="Enter your username" required>
                  </div>
                  
                  <div class="form-group mb-3">
                    <label for="password"><strong>Password:</strong></label>
                    <input type="password" v-model="password" class="form-control" placeholder="Enter your password" required>
                  </div>

                  <div class="form-group mb-4">
                    <label for="role"><strong>Select Role:</strong></label>
                    <select v-model="role" class="form-control" required>
                      <option value="influencer">Influencer</option>
                      <option value="sponsor">Sponsor</option>
                    </select>
                  </div>
                  
                  <button type="submit" class="btn btn-primary btn-block">Login</button>
                </form>
                
                <div class="footer-links mt-3 text-center">
                  <strong>New user?</strong> <router-link to="/userlogin/sign_up">Register</router-link><br>
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
      password: "",
      role: "",
      errorMessage: ""
    };
  },
  methods: {
    async userLogin() {
      try {
        const response = await fetch("/userlogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            role: this.role
          })
        });

        if (response.ok) {
          const data = await response.json();
          alert("Login successful!");
          localStorage.setItem("access_token", data.access_token);
          if (data.role === 'influencer') {
            this.$router.push(`/userlogin/inf_dash/${data.username}`);
          } else if (data.role === 'sponsor') {
            this.$router.push(`/userlogin/spon_dash/${data.username}`);
          }
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

export default userLogin;
  