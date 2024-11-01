import { AreaOfInterest } from './area-of-interest.enum';
import { User } from './user.interface';

export interface DeviceDocument {
  file: File;
  uploadedBy: User;
}

export interface Device {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  areaOfInterest: AreaOfInterest;
  locationName: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  additionalLocationInfo: string;
}
