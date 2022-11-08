import React, { useState } from "react";
import Layout from "../../components/Layout";
import UserNavbar from "../../components/UserNavbar";
import { Grid, Card, Button, Message } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import elections from "../../ethereum/elections";
import { useRouter } from "next/router";

const VotingArea = ({
  candidates,
  electionStartStatus,
  electionEndStatus,
  voted,
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const Vote = async (index) => {
    setErrorMessage("");
    setLoading(true);
    if (voted) {
      setErrorMessage("You have Already Voted!");
    } else {
      try {
        const accounts = await web3.eth.getAccounts();

        await elections.methods
          .vote(parseInt(index))
          .send({ from: accounts[0] });

        router.push("/user/result");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    setLoading(false);
  };
  return (
    <Layout>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <UserNavbar />
          </Grid.Column>

          <Grid.Column>
            <h1>Voting Area</h1>
            {electionStartStatus && electionEndStatus && (
              <h3>Election Over !!</h3>
            )}
            {!electionEndStatus && voted && <h3>You Have Alradey Voted !!</h3>}
            {!electionStartStatus && !electionEndStatus && (
              <h3>Voting is Not started yet</h3>
            )}
            {candidates.map((candidate, key) => {
              return (
                <Card key={key}>
                  <Card
                    image="/images/CEO.png"
                    header={candidate.name}
                    meta={candidate.party}
                  />
                  {((!electionStartStatus && !electionEndStatus) || voted) && (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        Vote(key);
                      }}
                      color="green"
                      disabled
                      loading={loading}
                    >
                      Vote
                    </Button>
                  )}
                  {!((!electionStartStatus && !electionEndStatus) || voted) && (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        Vote(key);
                      }}
                      color="green"
                      loading={loading}
                    >
                      Vote
                    </Button>
                  )}
                </Card>
              );
            })}
            {errorMessage.length > 0 && (
              <Message error header="Oops!" content={errorMessage} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

VotingArea.getInitialProps = async () => {
  const candidateCount = await elections.methods.getCandidateCount().call();

  const candidates = await Promise.all(
    Array(parseInt(candidateCount))
      .fill()
      .map((element, index) => {
        return elections.methods.candidates(index).call();
      })
  );

  const electionStartStatus = await elections.methods.start().call();

  const electionEndStatus = await elections.methods.end().call();

  const accounts = await web3.eth.getAccounts();

  const voted = await elections.methods.voted(accounts[0]).call();

  return {
    candidateCount,
    candidates,
    electionStartStatus,
    electionEndStatus,
    voted,
  };
};

export default VotingArea;
