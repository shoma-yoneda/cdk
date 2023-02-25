export class Constants {
    // DB PARAM
    static readonly DB_ENDPOINT: string = 'fanta-rice-mysql.c9q31ubz9jhq.ap-northeast-1.rds.amazonaws.com';
    static readonly DB_NAME: string = 'fanta';
    static readonly DB_PASSWORD: string = 'Takenoko3';
    static readonly DB_USER: string = 'admin';
    
    // lambda_handler
    static readonly HANDLER: string = 'lambda_function.lambda_handler';

    // lambda role
    static readonly LAMBDA_ROLE: string = 'arn:aws:iam::563186981220:role/myLambdaRole';

    // VPC ID
    static readonly VPC_ID: string = 'vpc-08e2f6ac41535d296';

    // subnet
    static readonly PRIVATE_SUBNETA: string = 'subnet-0bbfca717b4059ae0';
    static readonly PRIVATE_SUBNETC: string = 'subnet-0a1c05566eb4d6911';

    // security group
    static readonly LAMBDA_SG: string = 'sg-099daf9a41c307f53';


    // FUNCTION LIST
    static readonly GET_EVENT: string = 'getEvent';
    static readonly HOGEHOGE: string = 'getMajiManji';

    
  }