import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  message: string;
};

interface Response {
  data: {
    id: string;
    remoteId: string;
    companyName: string;
    companyLegalName: string;
    taxNumber: string | null;
    fiscalYearEndMonth: string | null;
    fiscalYearEndDay: string | null;
    currency: string;
    companyUrls: [];
    companyAddresses: {
      addressType: string;
      zipCode: string;
      city: string;
      street1: string;
      street2: string | null;
      state: string;
      countrySubdivision: string | null;
    }[];

    companyPhoneNumbers: [];
  };
}

export default async function getCompanyInfo(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | Response>
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

    res.status(200).json({ message: "success", data: response.data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not get company info!" });
  }
}
