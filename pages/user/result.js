import React from "react";
import Layout from "../../components/Layout";
import UserNavbar from "../../components/UserNavbar";
import { Grid, Message, Card } from "semantic-ui-react";
import elections from "../../ethereum/elections";

const Result = ({ electionStartStatus, electionEndStatus, winner }) => {
  return (
    <Layout>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <UserNavbar />
          </Grid.Column>

          <Grid.Column>
            <h1>Result</h1>
            {!electionStartStatus && <h3>Go Register Yourself</h3>}
            {electionStartStatus && !electionEndStatus && (
              <h3>Voting Phase is On</h3>
            )}
            {electionStartStatus && electionEndStatus && (
              <h3>Results Not Declared Yet!</h3>
            )}
            {electionStartStatus && electionEndStatus && winner && (
              <>
                <h3>Congratulations!</h3>
                <Card
                  image="/images/CEO.png"
                  header={winner.name}
                  meta={winner.party}
                />
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

Result.getInitialProps = async () => {
  const electionStartStatus = await elections.methods.start().call();

  const electionEndStatus = await elections.methods.end().call();

  let winner;
  if (electionStartStatus && electionEndStatus) {
    const index = await elections.methods.winner().call();

    const winnerPicked = await elections.methods.winnerPicked().call();

    if (winnerPicked) winner = await elections.methods.candidates(index).call();
  }

  return { electionStartStatus, electionEndStatus, winner };
};

export default Result;
