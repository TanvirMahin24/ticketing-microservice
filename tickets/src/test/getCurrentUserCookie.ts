import jwt from "jsonwebtoken";

export const getCurrentUserCookie = async () => {
  const email = "test@test.com";
  const password = "password";

  // Build JWT payload object
  const payloadd = { email, password };

  // create JWT
  const genaratedJwt = jwt.sign(payloadd, process.env.JWT_KEY!);

  //build session object
  const session = { jwt: genaratedJwt };

  // turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // encode it in base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return string of encoded data
  return `express:sess=${base64}`;
};
