import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).json({ message: "No userId provided!" });
  }

  try {
    const response = await axios.get(
      `https://embedded.runalloy.com/2023-12/users/${userId}`,

      {
        headers: {
          Authorization: `bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json({ message: response.data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not find user!" });
  }
}
