export type TaskDetailsType = {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  listId: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
  Comments: [
    {
      id?: string;
      description?: string;
      createdAt?: Date;
      updatedAt?: Date;
      taskId?: string;
      authorId?: string
    },
  ];
};
