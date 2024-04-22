import axios from "axios";

export default async function getOrders(req, res) {
  const { orderId, credentialId } = req.query;

  try {
    const response = await axios.get(
      `https://embedded.runalloy.com/2024-03/one/commerce/orders?credentialId=${credentialId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    console.log(response.data);
    res.status(200).json({ message: "success", data: response.data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not get orders!" });
  }
}
