import { HttpClient } from '@angular/common/http';
import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { EMPTY, Observable, catchError } from 'rxjs';

export class CustomLoader implements TranslateLoader {
  public constructor(private http: HttpClient) {}
  public getTranslation(lang: string): Observable<any> {
    return this.http.get(`/assets/i18n/${lang}.json`).pipe(catchError(() => EMPTY));
  }
}

const config: TranslateModuleConfig = {
  defaultLanguage: 'en',
  useDefaultLang: true,
  loader: {
    provide: TranslateLoader,
    useFactory: (httpClient: HttpClient) => new CustomLoader(httpClient),
    deps: [HttpClient]
  },
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler
  }
};

export function providei18n(): EnvironmentProviders {
  return importProvidersFrom([TranslateModule.forRoot(config)]);
}
