class BandSiteApi {
    constructor (apiKey) {
        this.apiKey = apiKey
        this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com/"
    }
    async postComment(comment) {
        try {
            const response = await axios.post(
                `${this.baseURL}comments?api_key=${this.apiKey}`,comment,
                {
                    headers : {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error posting comment:", error);
            throw error;
        }
    }

    async getComments() {
        try {
            const repose = await axios.get(
                `${this.baseURL}comments?api_key=${this.apiKey}`
            );
            return response.data.sort((a,b) => b.timesteamp - a.timestamp);
        } catch (error) {
            console.error("Error getting comments:", error);
            throw error;
        }
    }

    async getShows() {
        try {
            const response = await axios.get(
                `${this.baseURL}showDates?api_key=${this.apiKey}`
            );
            return response.data;
        } catch (error) {
            console.error("Error getting shows:", error);
            throw error;
        }
    }
}