const api_url = process.env.API_URL
const authToken = process.env.API_Key

type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function fetch_api(
  command: Command,
  ...args: (string | number)[]
) {
  let url: string;
  let method: string;

  switch (command) {
    case 'get':
      url = `${api_url}/${args.join('/')}`;
      method = 'GET';
      break;
    default:
      url = `${api_url}/${command}/${args.join('/')}`;
      method = 'POST'; // or whatever method is appropriate for other commands
  }

  if (!authToken) {
    throw new Error('API Key is not defined');
  }
  
  const response = await fetch(url, {
    method,
    headers: {
      'x-api-key': authToken,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Error executing command: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
