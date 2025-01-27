const rateLimit = require('express-rate-limit');

/**
 * Rate limiter middleware for API endpoints.
 * @param {number} maxRequests - Maximum number of requests allowed in the time window.
 * @param {number} windowMs - Time window in milliseconds.
 * @param {string} message - Custom message for rate limit exceeded.
 * @returns {Function} - Middleware function for rate limiting.
 */
const createRateLimiter = (maxRequests, windowMs, message) => {
    return rateLimit({
        windowMs, // Time window in milliseconds
        max: maxRequests, // Max number of requests in the time window
        message: {
            message: message || 'Too many requests, please try again later.'
        },
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
};

module.exports = createRateLimiter;
