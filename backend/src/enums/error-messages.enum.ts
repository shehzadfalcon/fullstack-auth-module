export enum EErrorMessages {
  // User errors
  ACCOUNT_EXISTS = 'User already exists.',
  USER_NOT_EXISTS = 'User does not exist!',
  USER_NOT_VERIFIED = 'Email is not verified yet. Please check your email.',
  INVALID_EMAIL = 'Invalid email!',

  // OTP errors
  INVALID_OTP = 'Invalid OTP.',
  OTP_EXPIRED = 'OTP expired. Request a new one',
  REUSE_OTP = 'Unable to request new OTP. Please wait until previous OTP expires.',

  // Password errors
  INVALID_PASSWORD = 'Invalid password.',
  INVALID_OLD_PASSWORD = 'The current password is incorrect. Please verify and try again.',

  // Token errors
  INVALID_TOKEN = 'Unauthorized access: Token not found',
  UNNATHORIZED_USER = 'Unauthorized access: User does not exist',
  UNATHORIZE_ACCESS = 'Unauthorized access',
  TOKEN_EXPIRED = 'Token expired.',
}
