const awsConfig = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_XXXXXXXXX",
    userPoolWebClientId: "xxxxxxxxxxxxxxxxxxxxxx",
    oauth: {
      domain: "your-domain.auth.us-east-1.amazoncognito.com",
      scope: ["openid", "email", "profile"],
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",
      responseType: "code"
    }
  }
};

export default awsConfig;
