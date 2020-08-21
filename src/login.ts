const {OAuth2Client} = require('google-auth-library');
export {};
let CLIENT_ID : string = "136122883712-eue6mcej6psh8meqkcemd8sklr277544.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
async function verify(token : string) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  
  return payload;
  //const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}


async function verifyUser(id : string){
    console.log("inside");
    let payload = await verify(id);
    console.log(payload);
    // check db for user and insert if not exist, generate user token, return user token
    return "ok";
}

module.exports = verifyUser;