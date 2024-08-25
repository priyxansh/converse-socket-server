export type Message = {
  id: string;
  content: string;
  type: string;
  createdAt: Date;
  status: string;
  sender: {
    id: string;
    name: string;
    username: string;
    image?: string | null;
  };
};
