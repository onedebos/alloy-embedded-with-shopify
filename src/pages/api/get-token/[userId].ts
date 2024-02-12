import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

interface Response extends ResponseData {
  data: {
    token: string;
  };
}

// Gets the JWT token to allow the user make requests
export default async function getToken(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | Response>
) {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).json({ message: "No userId provided!" });
  }

  try {
    const response = await axios.get(
      `https://embedded.runalloy.com/2023-12/users/${userId}/token`,

      {
        headers: {
          Authorization: `bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json({ message: "success", data: response.data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not generate token!" });
  }
}
