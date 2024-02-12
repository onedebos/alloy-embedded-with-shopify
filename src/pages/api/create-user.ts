import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

interface Response extends ResponseData {
  data: {
    userId: string;
  };
}

interface RequestBody {
  username: string;
}

// Creates a new User in Alloy
export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | Response>
) {
  if (!req.body.username) {
    res.status(400).json({ message: "No username provided!" });
  }

  const { username }: RequestBody = req.body;

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

    res.status(200).json({ message: "success", data: response.data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not create user!" });
  }
}
