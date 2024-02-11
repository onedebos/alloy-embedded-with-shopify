import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

interface RequestData extends NextApiRequest {
  body: {
    customerName: string;
    email: string;
    taxNumber: string;
  };
}

export default async function createCustomer(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { connectionId } = req.query;
  const { customerName, email, taxNumber } = req.body;

  try {
    const response = await axios.post(
      `https://embedded.runalloy.com/2023-12/one/accounting/customers?connectionId=${connectionId}`,
      {
        customerName,
        email,
        taxNumber,
        // phoneNumbers: { phoneNumberType: "", phoneNumber: "" },
      },
      {
        headers: {
          Authorization: `bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json({ message: response.data });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}
