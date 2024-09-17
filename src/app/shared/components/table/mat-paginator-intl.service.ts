import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MatPaginatorIntlService extends MatPaginatorIntl {
  public override itemsPerPageLabel = '';
  public override nextPageLabel = '';
  public override previousPageLabel = '';

  public constructor(private readonly translateService: TranslateService) {
    super();
  }

  public override getRangeLabel = (page: number, pageSize: number, amountOfItems: number): string => {
    return amountOfItems === 0
      ? this.translateService.instant('COMPONENTS.TABLE.PAGINATION', { current: 0, total: 0 })
      : this.translateService.instant('COMPONENTS.TABLE.PAGINATION', { current: page + 1, total: Math.ceil(amountOfItems / pageSize) });
  };
}
