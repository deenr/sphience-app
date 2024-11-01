import { Injectable } from '@angular/core';
import { Device, DeviceCreateRequest, EquipmentResponse } from '@core/models';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class HttpDeviceService extends BaseHttpService {
  private endpoint = 'devices';

  public getEquipment(page: number = 1, pageSize: number = 10): Observable<EquipmentResponse[]> {
    return this.get<EquipmentResponse[]>(this.endpoint, { page, pageSize });
  }

  public getDeviceById(id: string): Observable<Device> {
    return this.get<Device>(`${this.endpoint}/${id}`);
  }

  public createDevice(device: DeviceCreateRequest): Observable<Device> {
    return this.post<Device>(this.endpoint, device);
  }

  public updateDevice(id: string, movie: Partial<Device>): Observable<Device> {
    return this.put<Device>(`${this.endpoint}/${id}`, movie);
  }

  public deleteDevice(id: string): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }
}
