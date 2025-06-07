import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Chative - Chat With Friends",
  description = "This is a chat application that allows users to communicate in real-time.",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
