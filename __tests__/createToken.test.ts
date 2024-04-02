import request from "supertest";
import { pool } from "../database/postgres";
import { redisClient } from "../database/redis";
import { createToken } from "../controllers/tokens";
import { eventGenerator } from "./utils/eventGenerator";
import { Context } from "aws-lambda";

const context: Context = {
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'createToken',
  functionVersion: '1.0',
  invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:createToken',
  memoryLimitInMB: '128',
  awsRequestId: '1234567890',
  logGroupName: '/aws/lambda/createToken',
  logStreamName: '2022/05/02/[$LATEST]12345678901234567890',
  getRemainingTimeInMillis: () => 5000,
  done: () => {},
  fail: () => {},
  succeed: () => {},
};


describe('Tokens Handlers', () => {
  describe('createToken', () => {
    test('should return a 200 status code and a token', async () => {
      const event = eventGenerator({
        headers: {
          'content-type': 'application/json',
        },
        body: {
        card_number: '1234567890123456',
        cvv: '123',
        expiration_month: '12',
        expiration_year: '2023',
        email: 'tests@example.com'
        }
      })
      const response = await createToken(event, context, (error, result) => {return result})
      expect(response?.statusCode).toBe(200);
      expect(response?.body).toEqual(expect.objectContaining({
          token: expect.any(String),
      }))
    })
  })
})