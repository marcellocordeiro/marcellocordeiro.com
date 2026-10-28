// Based on https://github.com/mattpocock/ts-reset

declare namespace TSReset {
  type Falsy = false | 0 | "" | null | undefined | 0n;
  type NonFalsy<T> = Exclude<T, Falsy>;

  /**
   * Converts literal types to their primitive counterparts.
   */
  type WidenLiteral<T> = T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends bigint
          ? bigint
          : T extends symbol
            ? symbol
            : T;

  /**
   * Prevents literal types from being collapsed with their primitives.
   */
  // oxlint-disable-next-line typescript/ban-types
  type LooseLiteral<T> = T | (WidenLiteral<T> & {});
}

// oxlint-disable-next-line no-redeclare
interface Array<T> {
  // Allow passing, for example, any string even when the array is typed with literal string unions.
  // oxlint-disable-next-line typescript/method-signature-style
  includes(searchElement: TSReset.LooseLiteral<T>, fromIndex?: number): boolean;
}

interface ReadonlyArray<T> {
  // Allow passing, for example, any string even when the array is typed with literal string unions.
  // oxlint-disable-next-line typescript/method-signature-style
  includes(searchElement: TSReset.LooseLiteral<T>, fromIndex?: number): boolean;
}
