import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  completed?: boolean;

  @Field()
  dueDate!: string;
}


@InputType()
export class UpdateTodoInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  completed?: boolean;

  @Field({ nullable: true })
  dueDate?: string;
}