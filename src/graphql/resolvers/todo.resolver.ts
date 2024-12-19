import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import { Types } from 'mongoose';
import { TodoService } from '../../services';
import { TodoEntity } from '../../entities/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from '../schema/input.todo';

@Resolver(TodoEntity)
class TodoResolver {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  @Query(() => TodoEntity, { nullable: true })
  async getTodoById(@Arg('id') id: string): Promise<TodoEntity | null> {
    const objectId = new Types.ObjectId(id);
    return this.todoService.getTodoById(objectId);
  }

  @Query(() => [TodoEntity])
  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoService.getTodos();
  }

  @Mutation(() => TodoEntity)
  async createTodo(@Arg('input') input: CreateTodoInput): Promise<TodoEntity> {

    return this.todoService.createTodo(input);
  }

  @Mutation(() => TodoEntity, { nullable: true })
  async updateTodo(
    @Arg('id') id: string,
    @Arg('input') input: UpdateTodoInput
  ): Promise<TodoEntity | null> {
    const objectId = new Types.ObjectId(id);
    return this.todoService.updateTodo(objectId, input);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Arg('id') id: string): Promise<boolean | null> {
    const objectId = new Types.ObjectId(id);
    return this.todoService.deleteTodo(objectId);
  }
}

export { TodoResolver };
