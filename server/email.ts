import NodeMailer from "nodemailer";
import MarkdownIt from "markdown-it";

const markdownIt: MarkdownIt = new MarkdownIt({
  breaks: true,
  linkify: true,
});

export class Email {
  static async send({
    to,
    subject,
    markdown,
  }: {
    to: string;
    subject: string;
    markdown: string;
  }) {
    const smtp = NodeMailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    return new Promise((resolve) => {
      smtp.sendMail(
        {
          from: process.env.EMAIL_USER,
          to,
          subject,
          html: markdownIt.render(markdown),
        },
        (error, response) => {
          if (error) {
            throw error;
          }

          resolve(response);
        }
      );
    });
  }
}
