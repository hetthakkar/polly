var axios = require('axios');
export default async function createNewRoom(name: string, title: string) {

    try {
        const { data } = await axios.post(process.env.REACT_APP_API_BASE_URL + "create-room",
        {
            name,
            title
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        console.log('INside callback', data);
        return data;
    } catch (error) {
        console.log(error);
        // throw error;
    }



}