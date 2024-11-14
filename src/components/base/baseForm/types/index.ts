interface IRule {
  message: string;
  validator(value: any): boolean;
}

interface IRulesObject {
  [field: string]: Array<IRule>;
}

export interface IFormProps {
  autocomplete?: boolean;
  model?: Object | Array<Object>;
  rules?: IRulesObject;
}

export interface IFormItemProps {
  field: string;
  label?: string | null;
  required?: boolean;
  showErrorMessage?: boolean;
  message?: string | null;
}
