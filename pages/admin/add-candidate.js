import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Form, Button, Message, Grid } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import elections from "../../ethereum/elections";
import { useRouter } from "next/router";

const AddCandidate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");
  const [qualification, setQualification] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const candidateRegistration = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();

      await elections.methods
        .candidateRegistration(name, party, qualification, parseInt(age))
        .send({ from: accounts[0] });

      router.push("/admin/");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <h1>Candidate Details</h1>
      <Form loading={loading} onSubmit={candidateRegistration}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Form.Input
                label="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Form.Input
                label="Party"
                value={party}
                onChange={(e) => {
                  setParty(e.target.value);
                }}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Age"
                type="number"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
              <Form.Input
                label="Qualification"
                value={qualification}
                onChange={(e) => {
                  setQualification(e.target.value);
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Message error header="Oops!" content={errorMessage} />
              <Button primary>Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </AdminLayout>
  );
};

export default AddCandidate;
