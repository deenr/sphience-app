import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

export enum Breakpoint {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL'
}

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private customBreakpoints = {
    XS: '(max-width: 375px)',
    SM: '(min-width: 376px) and (max-width: 640px)',
    MD: '(min-width: 641px) and (max-width: 768px)',
    LG: '(min-width: 769px) and (max-width: 1024px)',
    XL: '(min-width: 1025px)'
  };

  private customBreakpointsMap = new Map<string, Breakpoint>([
    ['(max-width: 375px)', Breakpoint.XS],
    ['(min-width: 376px) and (max-width: 640px)', Breakpoint.SM],
    ['(min-width: 641px) and (max-width: 768px)', Breakpoint.MD],
    ['(min-width: 769px) and (max-width: 1024px)', Breakpoint.LG],
    ['(min-width: 1025px)', Breakpoint.XL]
  ]);

  public get currentBreakpoint$(): Observable<Breakpoint> {
    const customBreakpointsValues = Object.values(this.customBreakpoints);

    return this.breakpointObserver.observe(customBreakpointsValues).pipe(
      map((breakpointState: BreakpointState) => {
        for (const query of Object.keys(breakpointState.breakpoints)) {
          if (breakpointState.breakpoints[query]) {
            return this.customBreakpointsMap.get(query);
          }
        }
        return null;
      }),
      filter((breakpoint): breakpoint is Breakpoint => breakpoint !== null) // Type guard to filter nulls
    );
  }

  public get isDesktop$(): Observable<boolean> {
    return this.currentBreakpoint$.pipe(map((breakpoint) => breakpoint === Breakpoint.LG || breakpoint === Breakpoint.XL));
  }

  public constructor(private readonly breakpointObserver: BreakpointObserver) {}
}
