import type { IBaseInput } from "../../baseInput/types";

export enum SearchTriggerTypeEnum {
  input = "input",
  blur = "blur",
}

export interface IBaseSearchInput extends IBaseInput {
  countSymbolSearchTrigger?: number;
  searchDebounce?: number;
  searchTrigger?: SearchTriggerTypeEnum;
}
