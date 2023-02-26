    // //////////////////////////////////////////////////   lambda関数XXX   //////////////////////////////////////////////////
    // const funcXXX = new lambda.Function(this, Constants.HOGEHOGE, {
    //     functionName: Constants.HOGEHOGE,
    //     code: lambda.Code.fromAsset('lambda/'+Constants.HOGEHOGE),
    //     runtime: lambda.Runtime.PYTHON_3_9,
    //     handler: Constants.HANDLER,
    //     environment: {
    //       DB_ENDPOINT: Constants.DB_ENDPOINT,
    //       DB_NAME: Constants.DB_NAME,
    //       DB_PASSWORD: Constants.DB_PASSWORD,
    //       DB_USER: Constants.DB_USER
    //     },
    //     role: myRole,
    //     vpc: myVpc,
    //     securityGroups: [securityGroup],
    //     vpcSubnets: {
    //       subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
    //     },
    //   });
  
    //   // Define the integration between the API Gateway and Lambda function
    //   const lambdaIntegrationXXX = new apigateway.LambdaIntegration(funcXXX);
    //   const resourceXXX = restApi.root.addResource(Constants.HOGEHOGE);
    //   const methodXXX = resourceXXX.addMethod('GET', lambdaIntegrationXXX);
  
    //   // Add permissions to the API Gateway to call the Lambda function
    //   const lambdaPermissionXXX = new iam.PolicyStatement({
    //   effect: iam.Effect.ALLOW,
    //   actions: ['lambda:InvokeFunction'],
    //   resources: [funcXXX.functionArn],
    //   });
    //   lambdaRole.addToPolicy(lambdaPermissionXXX);
    //   funcXXX.grantInvoke(lambdaRole);
