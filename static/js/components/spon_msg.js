/*const sponmsg = Vue.component('sponmsg', {
    props: ['username'],  // Sponsor's username passed through the router

    data() {
        return {
            influencers: [],  // List of influencers to populate the dropdown
            selectedInfluencer: '',  // Selected influencer's username
            conversations: [],  // Chat history
            message: '',  // New message content
            successMessage: '',  // Success message after sending the message
            errorMessage: '',  // Error message if something goes wrong
        };
    },

    created() {
        this.fetchInfluencers();  // Fetch the list of influencers when the component is created
    },

    watch: {
        // When an influencer is selected, fetch the conversations
        selectedInfluencer(newInfluencer) {
            if (newInfluencer) {
                this.fetchConversations(newInfluencer);
            }
        }
    },

    methods: {
        // Fetch the list of influencers from the backend
        async fetchInfluencers() {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/spon_dash/get_influencers/${this.username}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    this.influencers = data.influencers;  // Populate influencers list
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (err) {
                console.error("Error fetching influencers:", err);
            }
        },

        // Fetch the conversation history between sponsor and influencer
        async fetchConversations(influencer) {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/spon_dash/get_conversations/${this.username}/${influencer}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    this.conversations = data.conversations;
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (err) {
                console.error("Error fetching conversations:", err);
            }
        },

        // Send a message to the selected influencer
        async sendMessage() {
            if (!this.selectedInfluencer || !this.message) {
                this.errorMessage = "Please select an influencer and write a message.";
                return;
            }

            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/spon_dash/send_message/${this.username}`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        recipient: this.selectedInfluencer,
                        message: this.message
                    })
                });

                if (response.ok) {
                    this.successMessage = "Message sent successfully!";
                    this.errorMessage = '';  // Clear any previous error
                    this.message = '';  // Clear the message input field
                    this.fetchConversations(this.selectedInfluencer);  // Refresh the conversation
                } else {
                    const error = await response.json();
                    this.errorMessage = error.message;
                }
            } catch (err) {
                console.error("Error sending message:", err);
                this.errorMessage = "An error occurred while sending the message.";
            }
        }
    },

    template: `
    <div>
        <h1>Chat with Influencer</h1>

        <div v-if="influencers.length === 0">
            <p>No influencers available for chat.</p>
        </div>

        <div v-else>
            <div>
                <label for="influencer">Select Influencer:</label>
                <select v-model="selectedInfluencer" id="influencer">
                    <option value="" disabled selected>Select an influencer</option>
                    <option v-for="influencer in influencers" :key="influencer.username" :value="influencer.username">
                        {{ influencer.username }}
                    </option>
                </select>
            </div>

            <div v-if="selectedInfluencer">
                <h3>Conversation with {{ selectedInfluencer }}:</h3>
                <div v-for="conversation in conversations" :key="conversation.timestamp">
                    <p><strong>{{conversation.sender===username ? "You":conversation.sender}}:</strong> {{ conversation.message }}</p>
                </div>

                <textarea v-model="message" rows="4" placeholder="Write your message..."></textarea>
                <button @click="sendMessage">Send</button>

                <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </div>
        </div>
    </div>
    `
});

export default sponmsg;*/

const sponmsg = Vue.component('sponmsg', {
    props: ['username'],  // Sponsor's username passed through the router

    data() {
        return {
            influencers: [],  // List of influencers to populate the dropdown
            selectedInfluencer: '',  // Selected influencer's username
            conversations: [],  // Chat history
            message: '',  // New message content
            successMessage: '',  // Success message after sending the message
            errorMessage: '',  // Error message if something goes wrong
        };
    },

    created() {
        this.fetchInfluencers();  // Fetch the list of influencers when the component is created
    },

    watch: {
        // When an influencer is selected, fetch the conversations
        selectedInfluencer(newInfluencer) {
            if (newInfluencer) {
                this.fetchConversations(newInfluencer);
            }
        }
    },

    methods: {
        // Fetch the list of influencers from the backend
        async fetchInfluencers() {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/spon_dash/get_influencers/${this.username}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    this.influencers = data.influencers;  // Populate influencers list
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (err) {
                console.error("Error fetching influencers:", err);
            }
        },

        // Fetch the conversation history between sponsor and influencer
        async fetchConversations(influencer) {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/spon_dash/get_conversations/${this.username}/${influencer}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    this.conversations = data.conversations;
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (err) {
                console.error("Error fetching conversations:", err);
            }
        },

        // Send a message to the selected influencer
        async sendMessage() {
            if (!this.selectedInfluencer || !this.message) {
                this.errorMessage = "Please select an influencer and write a message.";
                return;
            }

            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/spon_dash/send_message/${this.username}`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        recipient: this.selectedInfluencer,
                        message: this.message
                    })
                });

                if (response.ok) {
                    this.successMessage = "Message sent successfully!";
                    this.errorMessage = '';  // Clear any previous error
                    this.message = '';  // Clear the message input field
                    this.fetchConversations(this.selectedInfluencer);  // Refresh the conversation
                } else {
                    const error = await response.json();
                    this.errorMessage = error.message;
                }
            } catch (err) {
                console.error("Error sending message:", err);
                this.errorMessage = "An error occurred while sending the message.";
            }
        }
    },

    template: `
    <div class="container mt-5">
        <h1 class="text-center mb-4">Chat with Influencer</h1>

        <!-- No Influencers Available Alert -->
        <div v-if="influencers.length === 0" class="alert alert-warning">
            <p>No influencers available for chat.</p>
        </div>

        <div v-else>
            <!-- Influencer Dropdown -->
            <div class="mb-4">
                <label for="influencer" class="form-label">Select Influencer:</label>
                <select v-model="selectedInfluencer" id="influencer" class="form-select">
                    <option value="" disabled selected>Select an influencer</option>
                    <option v-for="influencer in influencers" :key="influencer.username" :value="influencer.username">
                        {{ influencer.username }}
                    </option>
                </select>
            </div>

            <!-- Conversation Section -->
            <div v-if="selectedInfluencer">
                <h3 class="mb-3">Conversation with {{ selectedInfluencer }}:</h3>

                <!-- Display Messages -->
                <div class="mb-3" v-for="conversation in conversations" :key="conversation.timestamp">
                    <div :class="{'text-end': conversation.sender === username}">
                        <p>
                            <strong :class="{'text-primary': conversation.sender === username}">
                                {{ conversation.sender === username ? "You" : conversation.sender }}:
                            </strong>
                            <span>{{ conversation.message }}</span>
                        </p>
                    </div>
                </div>

                <!-- Message Input Section -->
                <div class="mb-4">
                    <textarea v-model="message" class="form-control" rows="4" placeholder="Write your message..."></textarea>
                </div>

                <!-- Send Button -->
                <button @click="sendMessage" class="btn btn-primary w-100">Send</button>

                <!-- Success and Error Messages -->
                <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
                <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
            </div>
        </div>
    </div>
    `
});

export default sponmsg;