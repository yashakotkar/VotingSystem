import React, { Fragment } from "react";
import AdminNavbar from "./AdminNavbar";
import Layout from "./Layout";
import { Grid } from "semantic-ui-react";

const AdminLayout = (props) => {
  return (
    <Layout>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <AdminNavbar />
          </Grid.Column>
          <Grid.Column>{props.children}</Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default AdminLayout;
