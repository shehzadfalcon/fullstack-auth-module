import { Provider, Inject } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';

import { Connection } from 'mongoose';

import { EDependencyTokens } from 'src/enums/dependency-tokens.enum';

export interface TypegooseClass {
  new (...args: any[]);
}

export function getModelToken(modelName: string): string {
  return modelName + EDependencyTokens.DB_MODEL_TOKEN_SUFFIX;
}

// according to Class Obtain Provider
export function getProviderByTypegooseClass(
  typegooseClass: TypegooseClass,
): Provider {
  return {
    provide: getModelToken(typegooseClass.name),
    useFactory: (connection: Connection) =>
      getModelForClass(typegooseClass, { existingConnection: connection }),
    inject: [EDependencyTokens.DB_CONNECTION_TOKEN],
  };
}

// Model Injector
export function InjectModel(model: TypegooseClass) {
  return Inject(getModelToken(model.name));
}
