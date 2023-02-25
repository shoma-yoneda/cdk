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
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
        statusCode: 200,
      },
    });
    // Define the IAM role for the API Gateway to call the Lambda function
    const lambdaRole = new iam.Role(this, 'MyLambdaRole', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
    });
    //////////////////////////////////////////////////   INDIVIDUAL    //////////////////////////////////////////////////
    // lambda関数001
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
  }
}
