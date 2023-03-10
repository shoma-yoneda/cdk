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
    static readonly GET_EVENT_DETAIL: string = 'getEventDetail';
    // static readonly PUT_PICTURE: string = 'putPicture';
    static readonly GET_AREA: string = 'getArea';
    static readonly GET_COMMENT: string = 'getComment';
    static readonly GET_PREFECTURE: string = 'getPrefecture';
    static readonly GET_RANKING: string = 'getRanking';
    static readonly GET_RECOMMEND: string = 'getRecommend';
    static readonly GET_VERIFY_USER: string = 'getVerifyUser';
    static readonly POST_COMMENT: string = 'postComment';
    static readonly POST_USER: string = 'postUser';
    static readonly GET_PRESIGNED_URL: string = 'getPresignedUrl';
    static readonly GET_USER: string = 'getUser';
    static readonly GET_FAVORITE: string = 'getFavorite';
    static readonly POST_FAVORITE: string = 'postFavorite';
    static readonly GET_DONE: string = 'getDone';
    static readonly POST_DONE: string = 'postDone';
    static readonly POST_PROFILE: string = 'postProfile';
    static readonly POST_EVENT: string = 'postEvent';
    static readonly DELETE_FAVORITE: string = 'deleteFavorite';
    static readonly DELETE_DONE: string = 'deleteDone';
}