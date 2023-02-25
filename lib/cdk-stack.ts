import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Constants } from "../Constants";
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
  
      // Add permissions to the API Gateway to call the Lambda function
      const lambdaPermission010 = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [func010.functionArn],
      });
      lambdaRole.addToPolicy(lambdaPermission010);
      func010.grantInvoke(lambdaRole);
  }
}
