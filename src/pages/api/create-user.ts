import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type ResponseData = {
  message: string
}
 
export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!req.body.userId) {
    res.status(400).send("No userId provided");
  }

  const options = {
    method: "POST",
    url: "https://embedded.runalloy.com/2023-12/one/users",
    headers: {
      accept: "application/json",
      Authorization: `bearer ${config.apiKey}`,
      "content-type": "application/json",
    },
    data: { username: req.body.userId },
  };
  let response;
  try {
    response = await axios.request(options);
    res.status(200).json({ message: response.data })
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Could not create user!' })
  }

  
}