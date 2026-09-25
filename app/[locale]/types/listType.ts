


export type ListType = {
  id: string;
  name: string;
  creatorId: string;
  isPrivate: boolean;
  _count: {
    Tasks: number;
  };
  creator: {
    name: string;
  };
};
