export type TaskType = {
  id: string;
  title: string;
  description: string | null;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creator?: {
    id?: string;
    name?: string | null;
    email?: string;
  };
  listId: string;
  Comments?: Array<{
    id?: string;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    taskId?: string;
    authorId?: string;
    author?: {
      name?: string | null;
      email?: string | null;
    };
  }>;
};

