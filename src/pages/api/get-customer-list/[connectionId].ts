import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

interface Response {
  data: {
    customers: {
      remoteId: string;
      customerName: string;
      email: string;
      taxNumber: string | null;
      customerStatus: string;
      currency: string;
      companyId: string | null;
      addresses: [];
      phoneNumbers: [];
      createdTimestamp: any;
      updatedTimestamp: any;
      id: string;
    }[];
  };
  message: string;
}

export default async function getCustomerList(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | Response>
) {
  const { connectionId } = req.query;

  try {
    const response = await axios.get(
      `https://embedded.runalloy.com/2023-12/one/accounting/customers?connectionId=${connectionId}`,

      {
        headers: {
          Authorization: `bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json({ message: "success", data: response.data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not get company info!" });
  }
}
