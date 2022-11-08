import React from "react";
import Head from "next/head";
import { Container } from "semantic-ui-react";

const Layout = (props) => {
  return (
    <Container>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      {props.children}
      {/*<h1>Footer</h1>*/}
    </Container>
  );
};

export default Layout;
