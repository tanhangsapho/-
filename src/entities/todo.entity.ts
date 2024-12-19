import { Field, ID, ObjectType } from 'type-graphql';
import { ObjectId } from '../types';
import { modelOptions, Severity, prop as DbField } from '@typegoose/typegoose';
@ObjectType('Todo')
@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
})
class TodoEntity {
  @Field(() => ID, { name: 'id' })
  readonly _id?: ObjectId;

  @Field()
  @DbField({ required: true })
  title!: string;

  @Field({ nullable: true })
  @DbField({ required: false })
  description?: string;

  @Field()
  @DbField({ default: false })
  completed!: boolean;

  @Field()
  @DbField({ required: true })
  dueDate!: string;

  @DbField({ default: false })
  deleted?: boolean;

  @DbField({ default: Date.now })
  createdAt?: Date;

  @DbField()
  updatedAt?: Date;
}

export { TodoEntity };
