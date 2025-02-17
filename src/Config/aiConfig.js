const aiConstantSettings = {

    AI_MODEL: "gpt-4o-mini",
    SET_MAX_TOKENS:200,
    SET_TEMPERATURE:0.8,
}

const rateLimiterSettings = {
    MAX_REQUESTS: 5,
    WINDOW_DURATION: 60 * 1000, // 1 minute
    ERROR_MESSAGE: 'You have exceeded the maximum number of requests. Please try again later.',
};


module.exports = {
    aiConstantSettings,
    rateLimiterSettings
}