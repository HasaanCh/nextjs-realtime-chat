const api_url = process.env.API_URL
const authToken = process.env.API_Key

type Command = 'zrange' | 'sismember' | 'get' | 'smembers' | 'post'
var request_body: object ;
export async function fetch_api(
  command: Command,
  content_body: Array<string>,
  ...args: (string | number)[]
) {
  let url: string;
  let method: string;

  switch (command) {
    case 'get':
      url = `${api_url}/${args.join('/')}`;
      method = 'GET';
      break;
    case 'post':
      url = `${api_url}/${args.join('/')}`;
      method = 'POST';
      // Add data to be sent
      request_body = {
        user_email: content_body[0],
        user_name: content_body[1],
      };
      break;
    default:
      url = `${api_url}/${args.join('/')}`;
      method = 'GET';
  }
  console.log("Fetching URL: " + url);
  console.log("Body is: " + request_body);
  if (!authToken) {
    throw new Error('API Key is not defined');
  }
  
  const response = await fetch(url, {
    method,
    headers: {
      'x-api-key': authToken,
      'Content-Type': 'application/json', // Add this header
    },
    cache: 'no-store',
    body: method === 'POST' ? JSON.stringify(request_body) : null, // Add data to the request body
  });

  if (!response.ok) {
    console.log(response);
    throw new Error(`Error executing command: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
