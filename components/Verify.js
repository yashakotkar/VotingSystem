import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import Layout from "./Layout";

const verify = ({
  setOtpVerification,
  setVerifyRendering,
  aadharNumber,
  registeringUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    //Verify Otp with Server
    /* 
      const res = await axios.post('')

      if(res){
        setOtpVerification(true);    
      }else{
        setOtpVerification(false);
      }
    */
    setOtpVerification(true);
    setVerifyRendering(false);
  };
  return (
    <Layout>
      <h1>Enter Otp Sent to your Registered Email Address</h1>
      <Form onSubmit={verifyOtp} loading={loading}>
        <Form.Input
          type="number"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
        <Button primary>Validate</Button>
      </Form>
    </Layout>
  );
};

export default verify;
