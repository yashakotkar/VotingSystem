import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import elections from "../../ethereum/elections";
import AdminLayout from "../../components/AdminLayout";

const Candidates = ({ candidateCount, candidates }) => {
  return (
    <AdminLayout>
      <h1>Candidates</h1>
      {candidates.map((candidate, key) => {
        return (
          <Card>
            <Card
              image="/images/CEO.png"
              header={candidate.name + ` (${candidate.age})`}
              meta={candidate.party}
              description={candidate.qualification}
            />
          </Card>
        );
      })}
    </AdminLayout>
  );
};

Candidates.getInitialProps = async ({}) => {
  const candidateCount = await elections.methods.getCandidateCount().call();

  const candidates = await Promise.all(
    Array(parseInt(candidateCount))
      .fill()
      .map((element, index) => {
        return elections.methods.candidates(index).call();
      })
  );

  return {
    candidateCount,
    candidates,
  };
};

export default Candidates;
