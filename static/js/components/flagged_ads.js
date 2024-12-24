/*const flaggedAdDetails = Vue.component("flaggedAdDetails", {
    data() {
      return {
        ads: [], // Array to hold flagged ads
        username: this.$route.params.username // Assuming username is passed as a route param
      };
    },
    created() {
      this.getFlaggedAds(); // Fetch flagged ads on component creation
    },
    methods: {
      async getFlaggedAds() {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          return;
        }
  
        try {
          const response = await fetch("/admin/flagged_ads", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
  
          if (response.ok) {
            this.ads = await response.json();
          } else {
            const error = await response.json();
            alert("Error fetching flagged ads: " + error.message);
          }
        } catch (err) {
          console.error("Error:", err);
          alert("Failed to fetch flagged ads. Please check your network connection.");
        }
      },
      async unflagAd(adId) {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          return;
        }
  
        try {
          const response = await fetch(`/admin/unflag_ad/${adId}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
  
          if (response.ok) {
            alert("Ad unflagged successfully.");
            this.getFlaggedAds(); // Refresh the list after unflagging
          } else {
            const error = await response.json();
            alert("Error unflagging ad: " + error.message);
          }
        } catch (err) {
          console.error("Error:", err);
          alert("Failed to unflag ad. Please check your network connection.");
        }
      }
    },
    template: `
      <div>
        <div v-for="ad in ads" :key="ad.id" class="container">
          <p><strong>Name of the Ad:</strong> {{ ad.ad_name }}</p>
          <p><strong>Ad created by:</strong> {{ ad.username }}</p>
          <p><strong>Details of the Ad:</strong> {{ ad.ad_details }}</p>
          <p><strong>Camp Name:</strong> {{ ad.camp_name }}</p>
          <p><strong>Target Audience:</strong> {{ ad.ad_aud }}</p>
          <p><strong>Budget:</strong> {{ ad.ad_price }}</p>
          <p><strong>Duration:</strong> {{ ad.ad_duration }}</p>
          <button @click="unflagAd(ad.id)">Unflag</button>
        </div>
      </div>
    `
  });
  
export default flaggedAdDetails;*/


const flaggedAdDetails = Vue.component("flaggedAdDetails", {
  data() {
      return {
          ads: [], // Array to hold flagged ads
          username: this.$route.params.username // Assuming username is passed as a route param
      };
  },
  created() {
      this.getFlaggedAds(); // Fetch flagged ads on component creation
  },
  methods: {
      async getFlaggedAds() {
          const token = localStorage.getItem("access_token");
          if (!token) {
              alert("You are not logged in. Please log in again.");
              return;
          }

          try {
              const response = await fetch("/admin/flagged_ads", {
                  method: "GET",
                  headers: {
                      "Authorization": `Bearer ${token}`
                  }
              });

              if (response.ok) {
                  this.ads = await response.json();
              } else {
                  const error = await response.json();
                  alert("Error fetching flagged ads: " + error.message);
              }
          } catch (err) {
              console.error("Error:", err);
              alert("Failed to fetch flagged ads. Please check your network connection.");
          }
      },
      async unflagAd(adId) {
          const token = localStorage.getItem("access_token");
          if (!token) {
              alert("You are not logged in. Please log in again.");
              return;
          }

          try {
              const response = await fetch(`/admin/unflag_ad/${adId}`, {
                  method: "DELETE",
                  headers: {
                      "Authorization": `Bearer ${token}`
                  }
              });

              if (response.ok) {
                  alert("Ad unflagged successfully.");
                  this.getFlaggedAds(); // Refresh the list after unflagging
              } else {
                  const error = await response.json();
                  alert("Error unflagging ad: " + error.message);
              }
          } catch (err) {
              console.error("Error:", err);
              alert("Failed to unflag ad. Please check your network connection.");
          }
      }
  },
  template: `
    <div class="container mt-5">
      <h1 class="text-center mb-4">Flagged Ads</h1>

      <div v-for="ad in ads" :key="ad.id" class="card mb-4 shadow-sm">
        <div class="card-header bg-danger text-white">
          <h5 class="mb-0">Ad Information</h5>
        </div>
        <div class="card-body">
          <p><strong>Name of the Ad:</strong> {{ ad.ad_name }}</p>
          <p><strong>Ad created by:</strong> {{ ad.username }}</p>
          <p><strong>Details of the Ad:</strong> {{ ad.ad_details }}</p>
          <p><strong>Camp Name:</strong> {{ ad.camp_name }}</p>
          <p><strong>Target Audience:</strong> {{ ad.ad_aud }}</p>
          <p><strong>Budget:</strong> {{ ad.ad_price }}</p>
          <p><strong>Duration:</strong> {{ ad.ad_duration }}</p>
          <button @click="unflagAd(ad.id)" class="btn btn-warning">Unflag</button>
        </div>
      </div>
    </div>
  `
});

export default flaggedAdDetails;

  