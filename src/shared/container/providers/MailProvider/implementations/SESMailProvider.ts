import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';

import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendEmailDTO from '../dtos/ISendEmailDTO';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2020-12-01',
        region: 'us-east-1', // <-Pegar no console da aws
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendEmailDTO): Promise<void> {
    const { from: fromDefault } = mailConfig.defaults;

    await this.client.sendMail({
      subject,
      text: 'body',
      from: {
        name: from?.name || fromDefault.name,
        address: from?.email || fromDefault.email,
      },
      to: Array.isArray(to)
        ? to.map(contact => ({ name: contact.name, address: contact.email }))
        : { name: to.name, address: to.email },
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
