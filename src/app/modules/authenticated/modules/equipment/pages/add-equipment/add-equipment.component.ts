import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaOfInterest, DeviceCreateRequest } from '@core/models';
import { HttpEquipmentService } from '@core/services/api/http-equipment.service';
import { TabsItem } from '@shared/components/tabs/tabs-item.interface';
import { createRemainingCharsObservable } from '@shared/utils/remaining-chars.utils';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, take, throwError } from 'rxjs';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent {
  public readonly MAX_SHORT_TEXT_CHARS = 100;
  public readonly MAX_LONG_TEXT_CHARS = 500;

  public tabs: TabsItem<'details' | 'documents'>[] = [
    { key: 'details', value: 'Device details' },
    { key: 'documents', value: 'Documents', disabled: true }
  ];
  public activeTab = this.tabs[0];

  public areasOfInterest = Object.keys(AreaOfInterest);
  public detailsForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    shortDescription: new FormControl<string | null>(null, Validators.maxLength(this.MAX_SHORT_TEXT_CHARS)),
    longDescription: new FormControl<string | null>(null, Validators.maxLength(this.MAX_LONG_TEXT_CHARS)),
    areaOfInterest: new FormControl<AreaOfInterest | null>(null, Validators.required)
  });
  public locationForm = new FormGroup({
    locationName: new FormControl<string | null>(null, Validators.required),
    street: new FormControl<string | null>(null, Validators.required),
    postcode: new FormControl<string | null>(null, Validators.required),
    city: new FormControl<string | null>(null, Validators.required),
    country: new FormControl<string | null>(null, Validators.required),
    additionalLocationInfo: new FormControl<string | null>(null, Validators.maxLength(this.MAX_LONG_TEXT_CHARS))
  });
  public shortDescriptionCharsLeft$ = createRemainingCharsObservable(this.detailsForm.controls.shortDescription, this.MAX_SHORT_TEXT_CHARS);
  public longDescriptionCharsLeft$ = createRemainingCharsObservable(this.detailsForm.controls.longDescription, this.MAX_LONG_TEXT_CHARS);
  public additionalLocationInfoCharsLeft$ = createRemainingCharsObservable(this.locationForm.controls.additionalLocationInfo, this.MAX_LONG_TEXT_CHARS);

  public $savingChanges = signal<boolean>(false);
  public $isEditingDevice = computed(() => this.$deviceId() !== null);
  private $deviceId = signal<string | null>(null);

  constructor(
    private readonly equipmentService: HttpEquipmentService,
    private readonly toastService: ToastrService,
    private readonly router: Router
  ) {
    const { id } = inject(ActivatedRoute).snapshot.params;

    if (id) {
      this.$deviceId.set(id);

      this.equipmentService
        .getDeviceById(id)
        .pipe(
          take(1),
          takeUntilDestroyed(),
          catchError((err: HttpErrorResponse) => {
            const { message, error } = err.error;
            this.toastService.error(message, error);
            this.router.navigate(['/equipment']);
            return throwError(() => err);
          })
        )
        .subscribe((device) => {
          this.detailsForm.patchValue(device);
          this.locationForm.patchValue(device);
        });
    }
  }

  public saveChanges(): void {
    this.detailsForm.markAllAsTouched();
    this.locationForm.markAllAsTouched();

    if (this.detailsForm.valid && this.locationForm.valid) {
      const details = this.detailsForm.getRawValue();
      const location = this.locationForm.getRawValue();

      // Create the request object with proper typing
      const request: DeviceCreateRequest = {
        name: details.name!,
        areaOfInterest: details.areaOfInterest!,
        ...(details.shortDescription && { shortDescription: details.shortDescription }),
        ...(details.longDescription && { longDescription: details.longDescription }),
        locationName: location.locationName!,
        street: location.street!,
        postcode: location.postcode!,
        city: location.city!,
        country: location.country!,
        ...(location.additionalLocationInfo && { additionalLocationInfo: location.additionalLocationInfo })
      };

      this.$savingChanges.set(true);

      (this.$isEditingDevice() ? this.equipmentService.updateDevice(this.$deviceId()!, request) : this.equipmentService.createDevice(request))
        .pipe(
          take(1),
          finalize(() => {
            this.toastService.success(
              this.$isEditingDevice() ? 'The device has been updated and the latest changes are now visible.' : 'The device has been created and is now visible.',
              this.$isEditingDevice() ? 'Successfully updated device' : 'Successfully created device'
            );

            this.$savingChanges.set(false);
            this.router.navigate(['/equipment']);
          })
        )
        .subscribe();
    }
  }
}
