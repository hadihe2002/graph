import http from "k6/http";

export let options = {
  vus: 100, // Virtual users
  duration: "10s", // Test duration
};

export default function () {
  const query = `
    {
       authors { 
        __typename
        id
        name
      } 
    }
  `;
  http.post("http://localhost:4000/graphql", JSON.stringify({ query }), {
    headers: { "Content-Type": "application/json" },
  });
}
