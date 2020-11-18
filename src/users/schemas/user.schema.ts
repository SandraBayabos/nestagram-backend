import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/*
@Schema() decorator marks a class as a schema definition. Maps User class to MongoDB collection
of the same name 
@Prop() defines a property in the document
*/

@Schema()
export class User extends Document {
  @Prop()
  name: string

  @Prop()
  email: string

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User);

/*

Without decorators

import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

*/