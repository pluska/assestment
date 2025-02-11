import { APIGatewayProxyEvent } from 'aws-lambda';

export const eventGenerator = ({
  body,
  method,
  path = '',
  queryStringObject,
  pathParametersObject,
  stageVariables = null,
}: any): APIGatewayProxyEvent => {
  const request: APIGatewayProxyEvent = {
    body: body ? JSON.stringify(body) : null,
    headers: {},
    multiValueHeaders: {},
    httpMethod: method,
    isBase64Encoded: false,
    path,
    pathParameters: pathParametersObject || null,
    queryStringParameters: queryStringObject || null,
    multiValueQueryStringParameters: null,
    stageVariables,
    requestContext: {
      accountId: '',
      stage: '',
      apiId: '',
      authorizer: null,
      httpMethod: method,
      identity: {
        accessKey: '',
        accountId: '',
        apiKey: '',
        apiKeyId: '',
        caller: '',
        cognitoAuthenticationProvider: '',
        cognitoAuthenticationType: '',
        cognitoIdentityId: '',
        cognitoIdentityPoolId: '',
        principalOrgId: '',
        sourceIp: '',
        user: '',
        userAgent: '',
        userArn: '',
        clientCert: null,
      },
      path,
      protocol: '',
      requestId: '',
      requestTimeEpoch: 3,
      resourceId: '',
      resourcePath: '',
    },
    resource: '',
  };
  return request;
};
