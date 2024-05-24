import { DomainError } from "../../error/domainError";

export const WinnerDisc = {
  Draw: 0,
  Dark: 1,
  Light: 2,
} as const;

export type WinnerDisc = (typeof WinnerDisc)[keyof typeof WinnerDisc];

export function toWinnerDisc(value: any): WinnerDisc {
  if (!Object.values(WinnerDisc).includes(value)) {
    throw new DomainError(
      "InValidWinnerDiscValue",
      "InValid winner disc value"
    );
  }

  return value as WinnerDisc;
}
