/*const influencermsg = Vue.component('influencermsg', {
    props: ['username'],  // Influencer's username passed through the router

    data() {
        return {
            sponsors: [],  // List of sponsors to populate the dropdown
            selectedSponsor: '',  // Selected sponsor's username
            conversations: [],  // Chat history
            message: '',  // New message content
            successMessage: '',  // Success message after sending the message
            errorMessage: '',  // Error message if something goes wrong
        };
    },

    created() {
        this.fetchSponsors();  // Fetch the list of sponsors when the component is created
    },

    watch: {
        // When a sponsor is selected, fetch the conversations
        selectedSponsor(newSponsor) {
            if (newSponsor) {
                this.fetchConversations(newSponsor);
            }
        }
    },

    methods: {
        // Fetch the list of sponsors from the backend
        async fetchSponsors() {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/influencer_dash/get_sponsors/${this.username}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    this.sponsors = data.sponsors;  // Populate sponsors list
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (err) {
                console.error("Error fetching sponsors:", err);
            }
        },

        // Fetch the conversation history between influencer and sponsor
        async fetchConversations(sponsor) {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/influencer_dash/get_conversations/${this.username}/${sponsor}`, {
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

        // Send a message to the selected sponsor
        async sendMessage() {
            if (!this.selectedSponsor || !this.message) {
                this.errorMessage = "Please select a sponsor and write a message.";
                return;
            }

            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/influencer_dash/send_message/${this.username}`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        recipient: this.selectedSponsor,
                        message: this.message
                    })
                });

                if (response.ok) {
                    this.successMessage = "Message sent successfully!";
                    this.errorMessage = '';  // Clear any previous error
                    this.message = '';  // Clear the message input field
                    this.fetchConversations(this.selectedSponsor);  // Refresh the conversation
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
        <h1>Chat with Sponsor</h1>

        <div v-if="sponsors.length === 0">
            <p>No sponsors available for chat.</p>
        </div>

        <div v-else>
            <div>
                <label for="sponsor">Select Sponsor:</label>
                <select v-model="selectedSponsor" id="sponsor">
                    <option value="" disabled selected>Select a sponsor</option>
                    <option v-for="sponsor in sponsors" :key="sponsor.username" :value="sponsor.username">
                        {{ sponsor.username }}
                    </option>
                </select>
            </div>

            <div v-if="selectedSponsor">
                <h3>Conversation with {{ selectedSponsor }}:</h3>
                <div v-for="conversation in conversations" :key="conversation.timestamp">
                    <p><strong>{{ conversation.sender===username ? "You":conversation.sender}}:</strong> {{ conversation.message }}</p>
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

export default influencermsg;*/

const influencermsg = Vue.component('influencermsg', {
    props: ['username'],  // Influencer's username passed through the router

    data() {
        return {
            sponsors: [],  // List of sponsors to populate the dropdown
            selectedSponsor: '',  // Selected sponsor's username
            conversations: [],  // Chat history
            message: '',  // New message content
            successMessage: '',  // Success message after sending the message
            errorMessage: '',  // Error message if something goes wrong
        };
    },

    created() {
        this.fetchSponsors();  // Fetch the list of sponsors when the component is created
    },

    watch: {
        // When a sponsor is selected, fetch the conversations
        selectedSponsor(newSponsor) {
            if (newSponsor) {
                this.fetchConversations(newSponsor);
            }
        }
    },

    methods: {
        // Fetch the list of sponsors from the backend
        async fetchSponsors() {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/influencer_dash/get_sponsors/${this.username}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    this.sponsors = data.sponsors;  // Populate sponsors list
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (err) {
                console.error("Error fetching sponsors:", err);
            }
        },

        // Fetch the conversation history between influencer and sponsor
        async fetchConversations(sponsor) {
            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/influencer_dash/get_conversations/${this.username}/${sponsor}`, {
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

        // Send a message to the selected sponsor
        async sendMessage() {
            if (!this.selectedSponsor || !this.message) {
                this.errorMessage = "Please select a sponsor and write a message.";
                return;
            }

            const token = localStorage.getItem("access_token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch(`/userlogin/influencer_dash/send_message/${this.username}`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        recipient: this.selectedSponsor,
                        message: this.message
                    })
                });

                if (response.ok) {
                    this.successMessage = "Message sent successfully!";
                    this.errorMessage = '';  // Clear any previous error
                    this.message = '';  // Clear the message input field
                    this.fetchConversations(this.selectedSponsor);  // Refresh the conversation
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
        <h1 class="text-center mb-4">Chat with Sponsor</h1>

        <!-- No Sponsors Available Alert -->
        <div v-if="sponsors.length === 0" class="alert alert-warning">
            <p>No sponsors available for chat.</p>
        </div>

        <div v-else>
            <!-- Sponsor Dropdown -->
            <div class="mb-4">
                <label for="sponsor" class="form-label">Select Sponsor:</label>
                <select v-model="selectedSponsor" id="sponsor" class="form-select">
                    <option value="" disabled selected>Select a sponsor</option>
                    <option v-for="sponsor in sponsors" :key="sponsor.username" :value="sponsor.username">
                        {{ sponsor.username }}
                    </option>
                </select>
            </div>

            <!-- Conversation Section -->
            <div v-if="selectedSponsor">
                <h3 class="mb-3">Conversation with {{ selectedSponsor }}:</h3>

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

export default influencermsg;