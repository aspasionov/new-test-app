import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeMenuFields {
  id?: EntryFieldTypes.Integer;
  text?: EntryFieldTypes.Symbol;
  href?: EntryFieldTypes.Symbol;
}

export type TypeMenuSkeleton = EntrySkeletonType<TypeMenuFields, "menu">;
export type TypeMenu<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeMenuSkeleton, Modifiers, Locales>;
