const hostname = "https://assignment-api.greyseth.repl.co/";

async function getRequest(endpoint) {
  const response = await fetch(hostname + endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const returned = await response.json();
  return returned;
}

async function postRequest(endpoint, content) {
  //   console.log(JSON.stringify(content));
  const response = await fetch(hostname + endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });

  return await response.json();
}

export { getRequest, postRequest };
