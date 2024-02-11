import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

interface RequestData extends NextApiRequest {
  body: {
    username: string;
  };
}

// Creates a new User in Alloy
export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!req.body.username) {
    res.status(400).json({ message: "No username provided!" });
  }

  const { username } = req.body;

  try {
    const response = await axios.post(
      "https://embedded.runalloy.com/2023-12/one/users",
      {
        username,
      },
      {
        headers: {
          Authorization: `bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json({ message: response.data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not create user!" });
  }
}
