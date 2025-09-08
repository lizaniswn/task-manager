const awsConfig = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_oIX9vyXeS",
    userPoolWebClientId: "4s1k98e9mob06ok6g76uvqso8",
    oauth: {
      domain: "us-east-1oix9vyxes.auth.us-east-1.amazoncognito.com", 
      scope: ["openid", "email", "profile"],
      redirectSignIn: "http://localhost:3000/",   
      redirectSignOut: "http://localhost:3000/",  
      responseType: "code"
    }
  }
};
export default awsConfig;
