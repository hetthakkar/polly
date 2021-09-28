var axios = require('axios');
export default async function createNewRoomCallback(name) {

    const { data } = await axios.post("http://localhost:3000/dev/create-room", {
        name
    },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    console.log('INside callback',data);
    return data;
}