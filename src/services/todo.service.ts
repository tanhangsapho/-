import { TodoEntity } from '../entities/todo.entity';
import { CreateTodoInput } from '../graphql/schema/input.todo';
import { TodoRepository, TodoRepositoryImpl } from '../repositories';
import { ObjectId } from '../types';

class TodoService {
  constructor(
    private todoRepository: TodoRepository = new TodoRepositoryImpl()
  ) {}

  async createTodo(todo: CreateTodoInput): Promise<TodoEntity> {
    return await this.todoRepository.createTodo(todo);
  }

  async getTodos(): Promise<TodoEntity[]> {
    return await this.todoRepository.getTodos();
  }

  async getTodoById(id: ObjectId): Promise<TodoEntity | null> {
    const todo = await this.todoRepository.getTodoById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return await this.todoRepository.getTodoById(id);
  }

  async updateTodo(
    id: ObjectId,
    todo: Partial<TodoEntity>
  ): Promise<TodoEntity | null> {
    const getTodo = await this.todoRepository.getTodoById(id);
    if (!getTodo) {
      throw new Error('Todo not found');
    }
    return await this.todoRepository.updateTodo(id, todo);
  }

  async deleteTodo(id: ObjectId): Promise<boolean | null> {
    const todo = await this.todoRepository.getTodoById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return await this.todoRepository.deleteTodo(id);
  }
}

export { TodoService };
