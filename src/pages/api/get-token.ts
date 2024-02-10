import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

// Gets the JWT token to allow the user make requests
export default async function getToken(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!req.body.userId) {
    res.status(400).json({ message: "No userId provided!" });
  }

  const { userId } = req.body;

  try {
    const response = await axios.get(
      `https://embedded.runalloy.com/2023-12/users/${userId}/token`,

      {
        headers: {
          Authorization: `bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json({ message: response.data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not generate token!" });
  }
}
