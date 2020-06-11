export interface IAuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default {
  jwt: {
    secret: process.env.APP_SECRET || 'secret',
    expiresIn: '1d',
  },
} as IAuthConfig;
