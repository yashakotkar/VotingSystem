import React from "react";
import Layout from "../../components/Layout";
import { Button, Divider, Grid, Segment, Form } from "semantic-ui-react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const login = async () => {
    router.push("/user/");
  };
  return (
    <Layout>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <h1>Login</h1>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Form onSubmit={login}>
              <Form.Input label="Email" type="email" />
              <Form.Input label="Password" type="password" />
              <Button primary>Login</Button>
            </Form>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </Layout>
  );
};

export default Login;
