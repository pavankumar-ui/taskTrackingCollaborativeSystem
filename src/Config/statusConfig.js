
const statusConfig ={
      SUCCESS: 200,
      CREATED: 201,
      NOT_FOUND:404,
      BAD_REQUEST:400,
      UNAUTHORIZED:401,
      FORBIDDEN:403,
      INTERNAL_SERVER_ERROR:500,
      API_RATE_LIMIT:429,
      USER_TOKEN_INVALID:498,
        INVALID_TOKEN: 401,
        TOKEN_EXPIRED: 401,
        TOKEN_NOT_PROVIDED: 400,
        INVALID_ROLE: 403
}


module.exports ={
    statusConfig
}