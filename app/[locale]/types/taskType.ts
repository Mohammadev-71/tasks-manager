export type TaskType = {
  id: string;
  title: string;
  description: string | null;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  listId: string;
  Comments?: Array<{
    id?: string;
    description?: string | null;
    authorId?: string;
    author?: {
      name?: string;
      email?: string;
      id?: string;
    };
  }>;
};
