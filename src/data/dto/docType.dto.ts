export type DocTypeDTO = {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  deactivedDate: string | null;
  priority: number;
};
