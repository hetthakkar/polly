function randomNum(hi: number){
    return Math.floor(Math.random()*hi);
} 
function randomChar(){
    return String.fromCharCode(randomNum(100));
}
function randomString(length: number){
   var str = "";
   for(var i = 0; i < length; ++i){
        str += randomChar();
   }
   return str;
}

export function generateRoomKey(): string {
  return randomString(6);
}