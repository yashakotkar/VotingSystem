import React from "react";
import Layout from "../components/Layout";
import { Button, Container, Divider, Grid, Segment } from "semantic-ui-react";
import Link from "next/link";

const index = () => {
  return (
    <Layout>
      <Container>
        <h2>Welcome to E-Auction</h2>
      </Container>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Link href="/user/login">
              <Button content="User" size="big" />
            </Link>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Link href="/admin/login">
              <Button content="Admin" icon="signup" size="big" />
            </Link>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </Layout>
  );
};

export default index;
