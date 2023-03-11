import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Constants } from "./Constants";
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //////////////////////////////////////////////////   COMMON    //////////////////////////////////////////////////
    // VPCを定義
    const myVpc = ec2.Vpc.fromVpcAttributes(this, 'MyVpc', {
      vpcId: Constants.VPC_ID,
      availabilityZones: ['ap-northeast-1a', 'ap-northeast-1c'],
      privateSubnetIds: [Constants.PRIVATE_SUBNETA, Constants.PRIVATE_SUBNETC],
    });

    // ロールを定義
    const myRole = iam.Role.fromRoleArn(this, 'myLambdaRole', Constants.LAMBDA_ROLE)

    //セキュリティグループを定義
    const securityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, 'fanta-rice-lambda-sg', Constants.LAMBDA_SG);

    // API
    const restApi = new apigateway.RestApi(this, 'MyApi', {
      restApiName: 'rice-API',
      deployOptions: {
        stageName: "v1",
      },
    });
    // Define the IAM role for the API Gateway to call the Lambda function
    const lambdaRole = new iam.Role(this, 'MyLambdaRole', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
    });

    // Custom CORS settings for the resource
    const my_cors = {
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: ['GET', 'POST', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token'],
      maxAge: cdk.Duration.seconds(3000),
    };
    //////////////////////////////////////////////////   INDIVIDUAL    //////////////////////////////////////////////////
    //////////////////////////////////////////////////   lambda関数001   //////////////////////////////////////////////////
    const func001 = new lambda.Function(this, Constants.GET_EVENT, {
      functionName: Constants.GET_EVENT,
      code: lambda.Code.fromAsset('lambda/'+Constants.GET_EVENT),
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: Constants.HANDLER,
      environment: {
        DB_ENDPOINT: Constants.DB_ENDPOINT,
        DB_NAME: Constants.DB_NAME,
        DB_PASSWORD: Constants.DB_PASSWORD,
        DB_USER: Constants.DB_USER
      },
      role: myRole,
      vpc: myVpc,
      securityGroups: [securityGroup],
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
      },
    });

    // Define the integration between the API Gateway and Lambda function
    const lambdaIntegration001 = new apigateway.LambdaIntegration(func001);
    const resource001 = restApi.root.addResource(Constants.GET_EVENT);
    const method001 = resource001.addMethod('GET', lambdaIntegration001);

    // Add permissions to the API Gateway to call the Lambda function
    const lambdaPermission001 = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['lambda:InvokeFunction'],
    resources: [func001.functionArn],
    });
    lambdaRole.addToPolicy(lambdaPermission001);
    func001.grantInvoke(lambdaRole);

    //////////////////////////////////////////////////   lambda関数002   //////////////////////////////////////////////////
    const func002 = new lambda.Function(this, Constants.GET_EVENT_DETAIL, {
        functionName: Constants.GET_EVENT_DETAIL,
        code: lambda.Code.fromAsset('lambda/'+Constants.GET_EVENT_DETAIL),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration002 = new apigateway.LambdaIntegration(func002);
      const resource002 = restApi.root.addResource(Constants.GET_EVENT_DETAIL);
      const method002 = resource002.addMethod('GET', lambdaIntegration002);
  
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission002 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func002.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission002);
      func002.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数003   //////////////////////////////////////////////////
    const func003 = new lambda.Function(this, Constants.GET_AREA, {
        functionName: Constants.GET_AREA,
        code: lambda.Code.fromAsset('lambda/'+Constants.GET_AREA),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration003 = new apigateway.LambdaIntegration(func003);
      const resource003 = restApi.root.addResource(Constants.GET_AREA);
      const method003 = resource003.addMethod('GET', lambdaIntegration003);
  
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission003 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func003.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission003);
      func003.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数004   //////////////////////////////////////////////////
    const func004 = new lambda.Function(this, Constants.GET_COMMENT, {
        functionName: Constants.GET_COMMENT,
        code: lambda.Code.fromAsset('lambda/'+Constants.GET_COMMENT),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });

      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration004 = new apigateway.LambdaIntegration(func004);
      const resource004 = restApi.root.addResource(Constants.GET_COMMENT);
      const method004 = resource004.addMethod('GET', lambdaIntegration004);
  
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission004 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func004.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission004);
      func004.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数005   //////////////////////////////////////////////////
    const func005 = new lambda.Function(this, Constants.POST_COMMENT, {
        functionName: Constants.POST_COMMENT,
        code: lambda.Code.fromAsset('lambda/'+Constants.POST_COMMENT),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration005 = new apigateway.LambdaIntegration(func005);
      const resource005 = restApi.root.addResource(Constants.POST_COMMENT);
      const method005 = resource005.addMethod('POST', lambdaIntegration005);
      resource005.addCorsPreflight(my_cors);
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission005 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func005.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission005);
      func005.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数006   //////////////////////////////////////////////////
    const func006 = new lambda.Function(this, Constants.GET_PREFECTURE, {
        functionName: Constants.GET_PREFECTURE,
        code: lambda.Code.fromAsset('lambda/'+Constants.GET_PREFECTURE),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration006 = new apigateway.LambdaIntegration(func006);
      const resource006 = restApi.root.addResource(Constants.GET_PREFECTURE);
      const method006 = resource006.addMethod('GET', lambdaIntegration006);
  
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission006 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func006.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission006);
      func006.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数007   //////////////////////////////////////////////////
    const func007 = new lambda.Function(this, Constants.GET_RANKING, {
        functionName: Constants.GET_RANKING,
        code: lambda.Code.fromAsset('lambda/'+Constants.GET_RANKING),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration007 = new apigateway.LambdaIntegration(func007);
      const resource007 = restApi.root.addResource(Constants.GET_RANKING);
      const method007 = resource007.addMethod('GET', lambdaIntegration007);
  
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission007 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func007.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission007);
      func007.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数008   //////////////////////////////////////////////////
    const func008 = new lambda.Function(this, Constants.GET_RECOMMEND, {
        functionName: Constants.GET_RECOMMEND,
        code: lambda.Code.fromAsset('lambda/'+Constants.GET_RECOMMEND),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration008 = new apigateway.LambdaIntegration(func008);
      const resource008 = restApi.root.addResource(Constants.GET_RECOMMEND);
      const method008 = resource008.addMethod('GET', lambdaIntegration008);
  
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission008 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func008.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission008);
      func008.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数009   //////////////////////////////////////////////////
    const func009 = new lambda.Function(this, Constants.GET_VERIFY_USER, {
        functionName: Constants.GET_VERIFY_USER,
        code: lambda.Code.fromAsset('lambda/'+Constants.GET_VERIFY_USER),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration009 = new apigateway.LambdaIntegration(func009);
      const resource009 = restApi.root.addResource(Constants.GET_VERIFY_USER);
      const method009 = resource009.addMethod('GET', lambdaIntegration009);
  
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission009 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func009.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission009);
      func009.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数010   //////////////////////////////////////////////////
    const func010 = new lambda.Function(this, Constants.POST_USER, {
        functionName: Constants.POST_USER,
        code: lambda.Code.fromAsset('lambda/'+Constants.POST_USER),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration010 = new apigateway.LambdaIntegration(func010);
      const resource010 = restApi.root.addResource(Constants.POST_USER);
      const method010 = resource010.addMethod('POST', lambdaIntegration010);
      resource010.addCorsPreflight(my_cors);
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission010 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func010.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission010);
      func010.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数011   //////////////////////////////////////////////////
    const func011 = new lambda.Function(this, Constants.GET_PRESIGNED_URL, {
        functionName: Constants.GET_PRESIGNED_URL,
        code: lambda.Code.fromAsset('lambda/'+Constants.GET_PRESIGNED_URL),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration011 = new apigateway.LambdaIntegration(func011);
      const resource011 = restApi.root.addResource(Constants.GET_PRESIGNED_URL);
      const method011 = resource011.addMethod('GET', lambdaIntegration011);
  
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission011 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func011.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission011);
      func011.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数012   //////////////////////////////////////////////////
    const func012 = new lambda.Function(this, Constants.GET_USER, {
        functionName: Constants.GET_USER,
        code: lambda.Code.fromAsset('lambda/'+Constants.GET_USER),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration012 = new apigateway.LambdaIntegration(func012);
      const resource012 = restApi.root.addResource(Constants.GET_USER);
      const method012 = resource012.addMethod('GET', lambdaIntegration012);
  
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission012 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func012.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission012);
      func012.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数013   //////////////////////////////////////////////////
    const func013 = new lambda.Function(this, Constants.GET_FAVORITE, {
      functionName: Constants.GET_FAVORITE,
      code: lambda.Code.fromAsset('lambda/'+Constants.GET_FAVORITE),
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: Constants.HANDLER,
      environment: {
        DB_ENDPOINT: Constants.DB_ENDPOINT,
        DB_NAME: Constants.DB_NAME,
        DB_PASSWORD: Constants.DB_PASSWORD,
        DB_USER: Constants.DB_USER
      },
      role: myRole,
      vpc: myVpc,
      securityGroups: [securityGroup],
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
      },
    });

    // Define the integration between the API Gateway and Lambda function
    const lambdaIntegration013 = new apigateway.LambdaIntegration(func013);
    const resource013 = restApi.root.addResource(Constants.GET_FAVORITE);
    const method013 = resource013.addMethod('GET', lambdaIntegration013);

    // Add permissions to the API Gateway to call the Lambda function
    const lambdaPermission013 = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['lambda:InvokeFunction'],
    resources: [func013.functionArn],
    });
    lambdaRole.addToPolicy(lambdaPermission013);
    func013.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数014   //////////////////////////////////////////////////
    const func014 = new lambda.Function(this, Constants.GET_DONE, {
      functionName: Constants.GET_DONE,
      code: lambda.Code.fromAsset('lambda/'+Constants.GET_DONE),
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: Constants.HANDLER,
      environment: {
        DB_ENDPOINT: Constants.DB_ENDPOINT,
        DB_NAME: Constants.DB_NAME,
        DB_PASSWORD: Constants.DB_PASSWORD,
        DB_USER: Constants.DB_USER
      },
      role: myRole,
      vpc: myVpc,
      securityGroups: [securityGroup],
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
      },
    });

    // Define the integration between the API Gateway and Lambda function
    const lambdaIntegration014 = new apigateway.LambdaIntegration(func014);
    const resource014 = restApi.root.addResource(Constants.GET_DONE);
    const method014 = resource014.addMethod('GET', lambdaIntegration014);

    // Add permissions to the API Gateway to call the Lambda function
    const lambdaPermission014 = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['lambda:InvokeFunction'],
    resources: [func014.functionArn],
    });
    lambdaRole.addToPolicy(lambdaPermission014);
    func014.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数015   //////////////////////////////////////////////////
    const func015 = new lambda.Function(this, Constants.POST_FAVORITE, {
      functionName: Constants.POST_FAVORITE,
      code: lambda.Code.fromAsset('lambda/'+Constants.POST_FAVORITE),
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: Constants.HANDLER,
      environment: {
        DB_ENDPOINT: Constants.DB_ENDPOINT,
        DB_NAME: Constants.DB_NAME,
        DB_PASSWORD: Constants.DB_PASSWORD,
        DB_USER: Constants.DB_USER
      },
      role: myRole,
      vpc: myVpc,
      securityGroups: [securityGroup],
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
      },
    });

    // Define the integration between the API Gateway and Lambda function
    const lambdaIntegration015 = new apigateway.LambdaIntegration(func015);
    const resource015 = restApi.root.addResource(Constants.POST_FAVORITE);
    const method015 = resource015.addMethod('POST', lambdaIntegration015);
    resource015.addCorsPreflight(my_cors);
    // Add permissions to the API Gateway to call the Lambda function
    const lambdaPermission015 = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['lambda:InvokeFunction'],
    resources: [func015.functionArn],
    });
    lambdaRole.addToPolicy(lambdaPermission015);
    func015.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数016   //////////////////////////////////////////////////
    const func016 = new lambda.Function(this, Constants.POST_DONE, {
      functionName: Constants.POST_DONE,
      code: lambda.Code.fromAsset('lambda/'+Constants.POST_DONE),
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: Constants.HANDLER,
      environment: {
        DB_ENDPOINT: Constants.DB_ENDPOINT,
        DB_NAME: Constants.DB_NAME,
        DB_PASSWORD: Constants.DB_PASSWORD,
        DB_USER: Constants.DB_USER
      },
      role: myRole,
      vpc: myVpc,
      securityGroups: [securityGroup],
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
      },
    });

    // Define the integration between the API Gateway and Lambda function
    const lambdaIntegration016 = new apigateway.LambdaIntegration(func016);
    const resource016 = restApi.root.addResource(Constants.POST_DONE);
    const method016 = resource016.addMethod('POST', lambdaIntegration016);
    resource016.addCorsPreflight(my_cors);
    // Add permissions to the API Gateway to call the Lambda function
    const lambdaPermission016 = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['lambda:InvokeFunction'],
    resources: [func016.functionArn],
    });
    lambdaRole.addToPolicy(lambdaPermission016);
    func016.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数017   //////////////////////////////////////////////////
    const func017 = new lambda.Function(this, Constants.POST_PROFILE, {
      functionName: Constants.POST_PROFILE,
      code: lambda.Code.fromAsset('lambda/'+Constants.POST_PROFILE),
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: Constants.HANDLER,
      environment: {
        DB_ENDPOINT: Constants.DB_ENDPOINT,
        DB_NAME: Constants.DB_NAME,
        DB_PASSWORD: Constants.DB_PASSWORD,
        DB_USER: Constants.DB_USER
      },
      role: myRole,
      vpc: myVpc,
      securityGroups: [securityGroup],
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
      },
    });

    // Define the integration between the API Gateway and Lambda function
    const lambdaIntegration017 = new apigateway.LambdaIntegration(func017);
    const resource017 = restApi.root.addResource(Constants.POST_PROFILE);
    const method017 = resource017.addMethod('POST', lambdaIntegration017);
    resource017.addCorsPreflight(my_cors);
    // Add permissions to the API Gateway to call the Lambda function
    const lambdaPermission017 = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['lambda:InvokeFunction'],
    resources: [func017.functionArn],
    });
    lambdaRole.addToPolicy(lambdaPermission017);
    func017.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数018   //////////////////////////////////////////////////
    const func018 = new lambda.Function(this, Constants.POST_EVENT, {
        functionName: Constants.POST_EVENT,
        code: lambda.Code.fromAsset('lambda/'+Constants.POST_EVENT),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration018 = new apigateway.LambdaIntegration(func018);
      const resource018 = restApi.root.addResource(Constants.POST_EVENT);
      const method018 = resource018.addMethod('POST', lambdaIntegration018);
      resource018.addCorsPreflight(my_cors);
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission018 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func018.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission018);
      func018.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数019   //////////////////////////////////////////////////
    const func019 = new lambda.Function(this, Constants.DELETE_FAVORITE, {
        functionName: Constants.DELETE_FAVORITE,
        code: lambda.Code.fromAsset('lambda/'+Constants.DELETE_FAVORITE),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration019 = new apigateway.LambdaIntegration(func019);
      const resource019 = restApi.root.addResource(Constants.DELETE_FAVORITE);
      const method019 = resource019.addMethod('POST', lambdaIntegration019);
      resource019.addCorsPreflight(my_cors);
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission019 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func019.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission019);
      func019.grantInvoke(lambdaRole);
    //////////////////////////////////////////////////   lambda関数020   //////////////////////////////////////////////////
    const func020 = new lambda.Function(this, Constants.DELETE_DONE, {
        functionName: Constants.DELETE_DONE,
        code: lambda.Code.fromAsset('lambda/'+Constants.DELETE_DONE),
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: Constants.HANDLER,
        environment: {
          DB_ENDPOINT: Constants.DB_ENDPOINT,
          DB_NAME: Constants.DB_NAME,
          DB_PASSWORD: Constants.DB_PASSWORD,
          DB_USER: Constants.DB_USER
        },
        role: myRole,
        vpc: myVpc,
        securityGroups: [securityGroup],
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
      });
  
      // Define the integration between the API Gateway and Lambda function
      const lambdaIntegration020 = new apigateway.LambdaIntegration(func020);
      const resource020 = restApi.root.addResource(Constants.DELETE_DONE);
      const method020 = resource020.addMethod('POST', lambdaIntegration020);
      resource020.addCorsPreflight(my_cors);
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission020 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func020.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission020);
      func020.grantInvoke(lambdaRole);

  }
}
