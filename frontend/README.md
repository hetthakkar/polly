<h1> Backend functionality via REST APIs<h1>

1. Create Room

 - API Relative Path : /create-room
 - HTTP Type : Post 
 - Headers : authToken
 - Usage : Host can create a private room with this API
 - Input : PlayerID, Name
 - Output : Room {id,hostid,key} , token (for authorization)
 - Description: This is the very first API that will get hit once any user lands to Poll Me app. The PlayerID field is dynamic and is dependent on token. The fundamental logic here is to check if header has authtoken, if yes then decode playerID from authToken using prisma database and if not then we create a new entry in db and assign playerID. In cases wherein playerId is created afresh we send authToken in response of this API which is meant to be stored at clients local storage so that auth token header can be populated by client in subsequent requests. The response of this API suggests that a private room has been created hosted by {hostid} having Room ID as {id} and Room key as {key}.

2. Enter Room
<br>
  | Parameter | Value  |
  | --------- | ------ |
  |API Relative Path | /enter-room |
  | HTTP Type | Post |
  | Headers | authToken |
  | Usage | Player can enter a private room created by host using this API |
  | Input | PlayerID, Name, RoomKey |
  | Output | questionData  { questionType: {qid,description,options} }, token (for authorization)|
  | Description | After the host shares the room key with required audience, players can start joining the room using RoomKey. The API does some processing on whether its a first request by a specific player OR its duplicate and accordingly fetches playerID from prisma db. Once this processing is done, a new entry is added to room table with the current player. There is also some error handling we have performed to check if RoomKey is non-existant OR we are unable to fetch player data due to issues with auth token. Once the player is added to the room successfully, we create a response object of questions present in that room and send it back to the client |

 3. Create MCQ question
 - API Relative Path : /create-mcq-question
 - HTTP Type : Post
 - Headers : authToken
 - Usage : Host can create MCQ question using this API
 - Input : PlayerID, Name, RoomKey
 - Output : questionData  { questionType: {qid,description,options} }, token (for authorization)
 - Description: 