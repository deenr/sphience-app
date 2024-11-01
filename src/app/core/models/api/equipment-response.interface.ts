import { AreaOfInterest } from '../types/area-of-interest.enum';
import { DeviceDocument } from '../types/device.interface';

export interface EquipmentResponse {
  id: number;
  title: string;
  description: string;
  image: string;
  available: boolean;
  availableDate: string;
  areaOfInterest: AreaOfInterest;
  documents: DeviceDocument[];
}

export interface DeviceCreateRequest {
  name: string;
  shortDescription?: string;
  longDescription?: string;
  imageUrl?: string;
  areaOfInterest: AreaOfInterest;
  locationName: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  additionalLocationInfo?: string;
}
