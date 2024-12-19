import { getModelForClass } from '@typegoose/typegoose';
import { TodoEntity } from '../entities/todo.entity';
import { ObjectId } from '../types';

interface TodoRepository {
  createTodo: (todo: Partial<TodoEntity>) => Promise<TodoEntity>;
  getTodos: () => Promise<TodoEntity[]>;
  getTodoById: (id: ObjectId) => Promise<TodoEntity | null>;
  updateTodo: (
    id: ObjectId,
    todo: Partial<TodoEntity>
  ) => Promise<TodoEntity | null>;
  deleteTodo: (id: ObjectId) => Promise<boolean | null>;
}

class TodoRepositoryImpl implements TodoRepository {
  private model = getModelForClass(TodoEntity);

  async createTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    try {
      return await this.model.create(todo);
    } catch (error: unknown | any) {
      throw new Error(`Failed to create todo: ${error.message}`);
    }
  }

  async getTodos(): Promise<TodoEntity[]> {
    try {
      return await this.model.find({ deleted: { $ne: true } });
    } catch (error: unknown | any) {
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }
  }

  async getTodoById(id: ObjectId): Promise<TodoEntity | null> {
    try {
      const todo = await this.model.findById(id);

      if (!todo) {
        return null;
      }

      return todo;
    } catch (error: unknown | any) {
      throw new Error(`Failed to fetch todo: ${error.message}`);
    }
  }

  async updateTodo(
    id: ObjectId,
    todo: Partial<TodoEntity>
  ): Promise<TodoEntity | null> {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        {
          ...todo,
          updatedAt: new Date(),
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } catch (error: unknown | any) {
      throw new Error(`Failed to update todo: ${error.message}`);
    }
  }

  async deleteTodo(id: ObjectId): Promise<boolean | null> {
    try {
      const deletedTodo = await this.model.findByIdAndUpdate(
        id,
        {
          deleted: true,
          deletedAt: new Date(),
        },
        { new: true }
      );
      return deletedTodo !== null;
    } catch (error: unknown | any) {
      throw new Error(`Failed to delete todo: ${error.message}`);
    }
  }
}

export { TodoRepositoryImpl, TodoRepository };
