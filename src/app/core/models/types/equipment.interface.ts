import { User } from './user.interface';

export interface EquipmentDocument {
  file: File;
  uploadedBy: User;
}

export interface Equipment {
  id: number;
  title: string;
  description: string;
  image: string;
  available: boolean;
  availableDate: Date;
  documents: EquipmentDocument[];
}
