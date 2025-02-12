module.exports = {
  server_error: {
      id: 'SERVER_ERROR',
      statuscode: 500,
      message: 'Error interno de servidor'
  },
  user_not_found: {
      id: 'USER_NOT_FOUND',
      statuscode: 404,
      message: 'Usuario no encontrado'
  },
  register_error: {
    id: 'USER_CREATION_FAILED',
    statuscode: 400,
    message: 'Error al crear usuario'
  },
  unauthorized: {
    id: 'UNAUTHORIZED',
    statuscode: 401,
    message: 'Unauthorized access'
}
}