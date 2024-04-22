import axios from "axios";

export default async function getUser(req, res) {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).json({ message: "No userId provided!" });
  }

  try {
    const response = await axios.get(
      `https://embedded.runalloy.com/2024-03/users/${userId}/credentials`,

      {
        headers: {
          Authorization: `bearer ${process.env.API_KEY}`,
        },
      }
    );

    res
      .status(200)
      .json({ message: "success", data: response.data.data[0].credentialId });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not find user!" });
  }
}
