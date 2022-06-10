// In the case we access protected resources, the HTTP request needs Authorization header.
// The code below checks Local Storage for user item. If there is a logged in user with
// accessToken (JWT), return HTTP Authorization header. Otherwise, return an empty object.
// We will use "x-access-token" since we used Node.js as backend.
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
