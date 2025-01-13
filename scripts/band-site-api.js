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
}