function handleError(error, _req, res, _next) {
 res.status(error.status).json({ message: error.message });
}

module.exports = handleError;