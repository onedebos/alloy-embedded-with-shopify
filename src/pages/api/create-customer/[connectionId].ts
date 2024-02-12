import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

interface Response extends ResponseData {
  data: {
    customer: {
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
    };
  };
}

interface RequestBody {
  customerName: string;
  email: string;
  taxNumber: string;
}

export default async function createCustomer(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | Response>
) {
  const { connectionId } = req.query;
  const { customerName, email, taxNumber }: RequestBody = req.body;

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

    res.status(200).json({ message: "success", data: response.data });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}
