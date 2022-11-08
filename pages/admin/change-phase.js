import React, { Fragment, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Button, Message, Card } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import elections from "../../ethereum/elections";
import { useRouter } from "next/router";

const ChangePhase = ({
  electionStartStatus,
  electionEndStatus,
  winnerPicked,
  winner,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const declareWinner = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();

      await elections.methods.electionResults().send({ from: accounts[0] });

      router.replace("/admin/change-phase");
    } catch (error) {
      setErrorMessage(error);
    }
    setLoading(false);
  };

  const changeRegistrationPhase = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();

      await elections.methods.startElection().send({ from: accounts[0] });

      router.replace("/admin/change-phase");
    } catch (error) {
      setErrorMessage(error);
    }
    setLoading(false);
  };

  const changeVotingPhase = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();

      await elections.methods.endElection().send({ from: accounts[0] });

      router.replace("/admin/change-phase");
    } catch (error) {
      setErrorMessage(error);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <h1>Change Phase</h1>
      {!electionStartStatus && (
        <Fragment>
          <h3>Registeration Phase On</h3>
          <Button onClick={changeRegistrationPhase} loading={loading} primary>
            Change Phase
          </Button>
        </Fragment>
      )}
      {electionStartStatus && !electionEndStatus && (
        <Fragment>
          <h3>Voting Phase On</h3>
          <Button onClick={changeVotingPhase} loading={loading} primary>
            Change Phase
          </Button>
        </Fragment>
      )}
      {electionStartStatus && electionEndStatus && !winnerPicked && (
        <Fragment>
          <h3>Declare Result!</h3>
          <Button onClick={declareWinner} loading={loading} primary>
            Get Winner
          </Button>
        </Fragment>
      )}
      {electionStartStatus && electionEndStatus && winnerPicked && (
        <>
          <h3>Elections Over!</h3>
          <Card
            image="/images/CEO.png"
            header={winner.name}
            meta={winner.party}
          />
        </>
      )}

      {errorMessage.length > 0 && (
        <Message error header="Oops!" content={errorMessage} />
      )}
    </AdminLayout>
  );
};

ChangePhase.getInitialProps = async () => {
  const electionStartStatus = await elections.methods.start().call();

  const electionEndStatus = await elections.methods.end().call();

  const winnerPicked = await elections.methods.winnerPicked().call();

  let winner;

  const index = await elections.methods.winner().call();

  if (winnerPicked) winner = await elections.methods.candidates(index).call();

  return { electionStartStatus, electionEndStatus, winnerPicked, winner };
};

export default ChangePhase;
