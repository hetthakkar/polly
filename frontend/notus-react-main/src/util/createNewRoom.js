var axios = require('axios');
export default async function createNewRoomCallback(name) {
    var data = JSON.stringify({
        name
    });

    const res = await axios.post("http://localhost:3000/dev/create-room", data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    console.log(res);
}