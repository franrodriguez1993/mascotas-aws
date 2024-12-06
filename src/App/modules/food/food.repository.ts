import {
  AttributeValue,
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Food } from './food.dynamo';

@Injectable()
export class FoodRepository {
  private readonly tableName = 'food';
  private readonly clientDynamo = new DynamoDBClient({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async findAll() {
    const foodList: Food[] = [];

    const command = new ScanCommand({ TableName: this.tableName });

    const response = await this.clientDynamo.send(command);

    if (response.Items) {
      response.Items.forEach((item) => {
        foodList.push(Food.newInstanceFromDynamo(item));
      });
    }
    return foodList;
  }

  async findById(_id: string): Promise<Food> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        _id: {
          S: _id,
        },
      },
    });
    const response = await this.clientDynamo.send(command);

    if (response.Item) {
      return Food.newInstanceFromDynamo(response.Item);
    }
    return null;
  }

  async upsertOne(data: Food) {
    const itemObject: Record<string, AttributeValue> = {
      _id: {
        S: data._id,
      },
      name: {
        S: data.name,
      },
      price: {
        N: String(data.price),
      },
      createdAt: {
        N: String(data.createdAt.getTime()),
      },
    };
    if (data.updatedAt) {
      itemObject.updatedAt = {
        N: String(data.updatedAt.getTime()),
      };
    }

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: itemObject,
    });

    await this.clientDynamo.send(command);
    return data;
  }

  async deleteById(_id: string) {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: {
        _id: {
          S: _id,
        },
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_OLD',
    });

    const result = await this.clientDynamo.send(command);

    if (result.Attributes) {
      return true;
    }
    return false;
  }
}
