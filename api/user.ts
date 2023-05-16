module.exports = async (req:any, res:any) => {
  const userId = req.query.userId;

  const apiKey = process.env.API_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      apiKey: `${apiKey}`,
    },
  };

  try {
    const response = await fetch(
      `https://developers.teachable.com/v1/users/${userId}`,
      options,
    );
    const userData = await response.json();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
};
