import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

export default async function getCompanyInfo(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { connectionId } = req.query;

  try {
    const response = await axios.get(
      `https://embedded.runalloy.com/2023-12/one/accounting/company-info?connectionId=${connectionId}`,

      {
        headers: {
          Authorization: `bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json({ message: response.data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not get company info!" });
  }
}
