import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeMainFields {
  title?: EntryFieldTypes.Symbol;
  subtitle?: EntryFieldTypes.Symbol;
}

export type TypeMainSkeleton = EntrySkeletonType<TypeMainFields, "main">;
export type TypeMain<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeMainSkeleton, Modifiers, Locales>;
