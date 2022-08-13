import React from "react";
import { Card } from "src/components/card";
import { Title } from "src/components/title";
import { Subtitle } from "src/components/subtitle";
import { Button } from "src/components/button";
import { InputField } from "src/components/input-field";
import { spacing } from "src/utils/spacing";

const texts = {
  signInPageTitle: "Acessar o microblogue",
  signInPageSubtitle: "Por favor, digite o seu email para continuar.",
  emailPlaceholder: "Email",
  submitEmailButton: "Continuar",
};

export default function SignIn() {
  const [email, setEmail] = React.useState("");

  return (
    <div className="sign-in-page">
      <Card elevation={4}>
        <div className="sign-in-page-info">
          <Title>{texts.signInPageTitle}</Title>
          <Subtitle>{texts.signInPageSubtitle}</Subtitle>
        </div>
        <InputField
          type="email"
          placeholder={texts.emailPlaceholder}
          value={email}
          onChange={(nextEmail) => {
            setEmail(nextEmail);
          }}
        />
        <Button onClick={() => {}} label={texts.submitEmailButton} />
      </Card>
      <style jsx>{`
        .sign-in-page {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: ${spacing(8)};
        }
      `}</style>
    </div>
  );
}
