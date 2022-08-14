import colors from "shared/consts/colors.json";

export function GlobalStyles() {
  return (
    <style jsx global>{`
      body {
        font-size: 18px;
        font-family: "Helvetica";
        color: ${colors.textDarkPrimary};
        background-color: ${colors.lightGrey};
      }

      textarea,
      input {
        font-family: "Helvetica";
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      body,
      image,
      p {
        margin: 0;
        padding: 0;
        font-weight: normal;
      }

      button {
        border: 0;
      }
    `}</style>
  );
}
