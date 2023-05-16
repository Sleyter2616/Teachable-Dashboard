module.exports = async (req:any, res:any) => {
  const courseId = req.query.courseId;
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
      `https://developers.teachable.com/v1/courses/${courseId}/enrollments`,
      options,
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching enrollments' });
  }
};
