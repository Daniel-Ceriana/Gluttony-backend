const handleResponse = (res, status, success, data) => {
  return res.status(status).json({ success, ...data });
};

const handleError = (res, status, error) => {
  return res.status(status).json({ success: false, error: error.message });
};

module.exports = {
  handleResponse,
  handleError,
};
