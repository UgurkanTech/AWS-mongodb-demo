// middlewares/errorMiddleware.js

const notFound = (req, res, next) => {
    res.status(404);
    // Render the custom 404 page
    res.redirect('/404.html'); 
  };
  
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  module.exports = {
    notFound,
    errorHandler,
  };
  