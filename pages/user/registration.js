import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import UserNavbar from "../../components/UserNavbar";
import { Grid, Form, Button, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import Verify from "../../components/Verify";
import web3 from "../../ethereum/web3";
import elections from "../../ethereum/elections";

const Registration = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otpVerification, setOtpVerification] = useState();
  const [verifyRendering, setVerifyRendering] = useState(false);
  const [aadhar, setAadhar] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (otpVerification) {
      const registeringUser = async () => {
        try {
          const accounts = await web3.eth.getAccounts();

          await elections.methods
            .voterRegistration(web3.utils.toChecksumAddress(address))
            .send({ from: accounts[0] });

          router.push("/user/");
        } catch (error) {
          setErrorMessage(error.message);
        }
      };
      registeringUser();
      setLoading(false);
      setOtpVerification(false);
    }
  }, [otpVerification]);

  const OTP_VERIFICATION = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerifyRendering(true);
    setErrorMessage("");
  };

  if (verifyRendering) {
    return (
      <Verify
        setOtpVerification={setOtpVerification}
        setVerifyRendering={setVerifyRendering}
        aadharNumber={aadhar}
      />
    );
  } else {
    return (
      <Layout>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <UserNavbar />
            </Grid.Column>

            <Grid.Column>
              <h1>Voter Registration</h1>
              <Form loading={loading} onSubmit={OTP_VERIFICATION}>
                <Form.Input
                  label="Aadhar Number"
                  placeholder="Enter your Aadhar Number"
                  value={aadhar}
                  onChange={(e) => {
                    setAadhar(e.target.value);
                  }}
                />
                <Form.Input
                  label="Account Address"
                  placeholder="Ehereum Account"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />

                <Message error header="Oops!" content={errorMessage} />

                <Button primary>Submit</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
};
export default Registration;
