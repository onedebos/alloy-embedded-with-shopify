import axios from "axios";

export default async function getIntegrations(req, res) {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).json({ message: "No userId provided!" });
  }

  try {
    const response = await axios.get(
      `https://embedded.runalloy.com/2024-03/integrations?userId=${userId}`,

      {
        headers: {
          Authorization: `bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json({ message: "success", data: response.data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not find user!" });
  }
}
