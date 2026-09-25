


export type TaskType = {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  listId: string;
  Comments: [
    {
      description: string;
    },
  ];
};
