/**
 * Test data constants for SauceDemo
 * URL: https://www.saucedemo.com/
 */
export const SAUCEDEMO_URL = 'https://www.saucedemo.com/';

export const SAUCEDEMO_CREDENTIALS = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  problemUser: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  performanceGlitchUser: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  },
  errorUser: {
    username: 'error_user',
    password: 'secret_sauce'
  },
  visualUser: {
    username: 'visual_user',
    password: 'secret_sauce'
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password'
  }
} as const;
