const sponsordashboard = Vue.component("sponsordashboard", {
    props: ['username'],
    template: `
    <div class="container mt-4">
        <h1 class="text-center mb-4">Welcome, {{ username }}</h1>
        <div class="header text-center mb-4">
            <router-link :to="'/userlogin/spon_dash/create_task/' + username">
                <button class="btn btn-primary m-2">Create Camp</button>
            </router-link>
            <router-link :to="'/userlogin/spon_dash/create_ad/' + username">
                <button class="btn btn-primary m-2">Create Ad</button>
            </router-link>
            <router-link :to="'/userlogin/spon_dash/your_camp/' + username">
                <button class="btn btn-primary m-2">Your Campaigns</button>
            </router-link>
            <router-link :to="'/userlogin/spon_dash/your_ad/' + username">
                <button class="btn btn-primary m-2">Your Ads</button>
            </router-link>
            <router-link :to="'/userlogin/spon_dash/send_message/' + username">
                <button class="btn btn-primary m-2">Chat</button>
            </router-link>
            <router-link :to="'/userlogin/spon_dash/search_influ/' + username">
                <button class="btn btn-primary m-2">Search Influencers</button>
            </router-link>
            <button class="btn btn-primary mb-3" @click="exportAsCSV">Export as CSV</button>
            <button @click="logout" class="btn btn-danger m-2">Logout</button>
        </div>
        <div class="content">
            <h3>Other Active Campaigns:</h3>
            <div v-for="(camp, ind) in otherCampaigns" :key="camp.id" class="campaign-box mb-3">
                <div class="campaign-info bg-light p-3 rounded">
                    <span>Campaign {{ ind + 1 }}</span>
                    <router-link :to="'/userlogin/spon_dash/other_camp_details/' + camp.id + '/' + username">
                        <button class="btn btn-info btn-sm float-right">View</button>
                    </router-link>
                </div>
            </div>

            <h3>Other Active Ads:</h3>
            <div v-for="(ad, ind) in otherAds" :key="ad.id" class="ad-box mb-3">
                <div class="ad-info bg-light p-3 rounded">
                    <span>Ad {{ ind + 1 }}</span>
                    <router-link :to="'/userlogin/spon_dash/other_ad_details/' + ad.id + '/' + username">
                        <button class="btn btn-info btn-sm float-right">View</button>
                    </router-link>
                </div>
            </div>

            <button class="btn btn-success btn-lg" @click="openPaymentModal()">Go to Payment</button>
            
            <!-- Modal for Payment Options -->
            <div v-if="showPaymentModal" class="modal fade show" style="display:block; background-color: rgba(0, 0, 0, 0.5);" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="paymentModalLabel">Select Payment Method</h5>
                            <button type="button" class="btn-close" @click="closePaymentModal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <button class="btn btn-primary w-100 mb-3" @click="selectPaymentMethod('UPI')">UPI</button>
                            <button class="btn btn-secondary w-100" @click="selectPaymentMethod('Bank Transfer')">Bank Transfer</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payment Form (conditionally rendered) -->
            <div v-if="paymentMethod" class="payment-form">
                <h3>Enter Payment Details for {{ paymentMethod }}</h3>
                <form @submit.prevent="submitPayment">
                    <!-- UPI Payment Fields -->
                    <div v-if="paymentMethod === 'UPI'" class="mb-3">
                        <label for="upiId" class="form-label">Enter your UPI ID</label>
                        <input type="text" id="upiId" class="form-control" v-model="upiId" required />
                    </div>
                    <div v-if="paymentMethod === 'UPI'" class="mb-3">
                        <label for="upiAmount" class="form-label">Enter Payment Amount</label>
                        <input type="number" id="upiAmount" class="form-control" v-model="upiAmount" required />
                    </div>
                    <div v-if="paymentMethod === 'UPI'" class="mb-3">
                        <label for="upiTransactionId" class="form-label">Enter Transaction ID</label>
                        <input type="text" id="upiTransactionId" class="form-control" v-model="upiTransactionId" required />
                    </div>

                    <!-- Bank Transfer Payment Fields -->
                    <div v-if="paymentMethod === 'Bank Transfer'" class="mb-3">
                        <label for="accountNumber" class="form-label">Enter your Bank Account Number</label>
                        <input type="text" id="accountNumber" class="form-control" v-model="accountNumber" required />
                    </div>
                    <div v-if="paymentMethod === 'Bank Transfer'" class="mb-3">
                        <label for="bankAmount" class="form-label">Enter Payment Amount</label>
                        <input type="number" id="bankAmount" class="form-control" v-model="bankAmount" required />
                    </div>
                    <div v-if="paymentMethod === 'Bank Transfer'" class="mb-3">
                        <label for="bankTransactionId" class="form-label">Enter Transaction ID</label>
                        <input type="text" id="bankTransactionId" class="form-control" v-model="bankTransactionId" required />
                    </div>

                    <button type="submit" class="btn btn-success w-100">Make Payment</button>
                </form>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            otherCampaigns: [],
            otherAds: [],
            showPaymentModal: false,
            paymentMethod: null,
            upiId: '',
            upiAmount: '', // *** Added field for UPI amount
            upiTransactionId: '', // *** Added field for UPI transaction ID
            accountNumber: '',
            bankAmount: '', // *** Added field for Bank Transfer amount
            bankTransactionId: '', // *** Added field for Bank Transfer transaction ID
        };
    },
    methods: {
        openPaymentModal() {
            this.showPaymentModal = true;
        },
        closePaymentModal() {
            this.showPaymentModal = false;
            this.paymentMethod = null;
        },
        selectPaymentMethod(method) {
            this.paymentMethod = method;
            this.showPaymentModal = false; // Close the modal after selecting payment method
        },
        async submitPayment() {
            // Validate for UPI Payment
            if (this.paymentMethod === 'UPI') {
                if (!this.upiId || !this.upiAmount || !this.upiTransactionId) {
                    alert("Please fill in all UPI details.");
                    return;
                }
            }
            
            // Validate for Bank Transfer Payment
            if (this.paymentMethod === 'Bank Transfer') {
                if (!this.accountNumber || !this.bankAmount || !this.bankTransactionId) {
                    alert("Please fill in all Bank Transfer details.");
                    return;
                }
            }
            
            // Simulate the payment process
            alert(`Payment of ${this.paymentMethod === 'UPI' ? this.upiAmount : this.bankAmount} successful via ${this.paymentMethod}.`);

            // Optionally, reset the fields after payment
            this.upiId = '';
            this.upiAmount = '';
            this.upiTransactionId = '';
            this.accountNumber = '';
            this.bankAmount = '';
            this.bankTransactionId = '';
        },
        async fetchDashboardData() {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    alert("You are not logged in. Please log in again.");
                    this.$router.push('/');
                    return;
                }
                const response = await fetch(`/userlogin/spon_dash/${this.username}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.username !== this.username) {
                        alert("Unauthorized access.");
                        this.$router.push('/');
                        return;
                    }
                    this.otherCampaigns = data.other_camps;
                    this.otherAds = data.other_ads;
                } else {
                    const error = await response.json();
                    alert(error.message);
                    if (error.message === "Unauthorized access") {
                        this.logout();
                    }
                }
            } catch (err) {
                console.error("Error:", err);
                alert("An unexpected error occurred. Please try again later.");
            }
        },
        exportAsCSV() {
            fetch(`/api/sponsor/${this.username}/export`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                const taskId = data.task_id;
                alert(data.message);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
        },      
        async logout() {
            localStorage.removeItem("access_token");
            this.$router.push('/');
        },
    },
    created() {
        this.fetchDashboardData();
    }
});

export default sponsordashboard;