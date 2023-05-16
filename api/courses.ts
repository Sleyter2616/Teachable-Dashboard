module.exports = async (req:any, res:any) => {
  const apiKey = process.env.API_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      apiKey: `${apiKey}`,
    },
  };

  try {
    const response = await global.fetch(
      'https://developers.teachable.com/v1/courses',
      options,
    );
    console.log('response try');
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Fetch error: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
