export interface IMailFrom {
  email: string;
  name: string;
}

export interface IMailDefaults {
  from: IMailFrom;
}

export interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: IMailDefaults;
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'equipe@gobarber.com', // Email que está cadastrado la no registro da aws ses com dominio proprio
      name: 'Equipe GoBarber',
    },
  },
} as IMailConfig;
