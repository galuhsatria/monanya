import { transporter } from "@/lib/email-sender";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  render,
  Section,
  Text,
} from "@react-email/components";

export interface EmailVerificationProps {
  url: string;
  name: string;
  email?: string;
}

function EmailVerificationRequest({ url, name }: EmailVerificationProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Verifikasi Email Anda</Preview>
        <Container style={container}>
          <Img
            src={process.env.NEXT_PUBLIC_BASE_URL + `/monanya-logo-black.png`}
            width="40"
            height="33"
            alt="Monanya"
          />
          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Selamat datang di Monanya, klik tombol di bawah untuk melakukan
              verifikasi alamat email anda
            </Text>
            <Button style={button} href={url}>
              Verifikasi Email
            </Button>
            <Text style={text}>Best,</Text>
            <Text style={text}>The Monanya team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#2da86d",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

export const sendingEmailVerification = async ({
  url,
  name,
  email,
}: EmailVerificationProps) => {
  const emailVerificationHtml = await render(
    <EmailVerificationRequest url={url} name={name} />,
  );
  const options = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Email Verification",
    html: emailVerificationHtml,
  };

  await transporter.sendMail(options);
};
