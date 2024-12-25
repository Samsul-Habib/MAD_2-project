const home = Vue.component("home", {
    template: `
      <div class="container text-center">
        <div class="d-flex justify-content-between align-items-center mt-3">
          <h1 class="text-danger fw-bold">Your Hub for Meaningful Brand Partnerships</h1>
          <!-- User Login Button (top right) -->
          <router-link to="/userlogin" class="btn btn-primary ms-auto">User Login</router-link>
          <router-link to="/adminlogin" class="btn btn-primary ms-auto">Admin Login</router-link>
        </div>
  
        <!-- Image Section -->
        <div class="my-4">
          <img src="/static/js/images/front_page.jpg" alt="Front Page Image" class="img-fluid">
        </div>
  
        <!-- Buttons Section -->
        <div class="d-flex flex-wrap justify-content-end my-5">
          <button class="btn btn-info mx-2 mb-2">Get a Demo</button>
          <button class="btn btn-info mx-2 mb-2">Resources</button>
          <button class="btn btn-info mx-2 mb-2">Customers</button>
          <button class="btn btn-info mx-2 mb-2">Company</button>
          <button class="btn btn-info mx-2 mb-2">Contact Us</button>
        </div>
  
        <!-- Social Icons Section -->
        <div class="text-start">
          <div class="fw-bold">Follow us</div>
          <div class="d-flex mt-2">
            <img src="/static/js/images/f_l.png" alt="facebook" class="me-2" style="width: 40px; height: 40px;">
            <img src="/static/js/images/i_l.png" alt="instagram" class="me-2" style="width: 40px; height: 40px;">
            <img src="/static/js/images/y_l.png" alt="youtube" class="me-2" style="width: 40px; height: 40px;">
            <img src="/static/js/images/t_l.png" alt="twitter" class="me-2" style="width: 40px; height: 40px;">
          </div>
        </div>
      </div>
    `
  });
  
  export default home;
  