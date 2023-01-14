import { Schema, Prop } from '@nestjs/mongoose';
import Document from 'mongoose';

export type UserDocument=User & Document
@Schema() 
export class User {
@Prop()
email:string;
@Prop()
firstname:string;
@Prop()
lastName:string;
@Prop()
password:string;
}

export const UserSchema=SchemaFactory.createForClass(User)
