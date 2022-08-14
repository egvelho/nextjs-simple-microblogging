import { useState, useEffect, Dispatch } from "react";

export interface FormInput<Value> {
  value: Value;
  label: string;
  helperText: string;
  error: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (value: Value) => void;
}

export type FormState<T> = {
  [key in keyof T]: {
    value: T[key];
    errors: string[];
    focus: boolean;
    touched: boolean;
  };
};

export type FormErrorMap<T> = Partial<{
  [key in keyof T]: string[];
}>;

export type Validate<T> = (form: T) => Promise<FormErrorMap<T>>;

export type UseForm<T> = {
  state: T;
  form: FormState<T>;
  reset: () => Promise<FormState<T>>;
  pushFormErrors: (
    errors?: FormErrorMap<T>
  ) => Promise<{ form: FormState<T>; success: boolean }>;
  setFormState: Dispatch<Partial<T>>;
  setFormFocus: (key: keyof T) => void;
  setFormBlur: (key: keyof T) => void;
  mapToFormInputs: (formLabels: { [key in keyof T]: string }) => {
    [key in keyof T]: FormInput<T[key]>;
  };
};

export function useForm<T extends Object>({
  validate,
  initialState,
}: {
  validate: Validate<T>;
  initialState: T;
}): UseForm<T> {
  const [state, setState] = useState(initialState);
  const [form, setForm] = useState(getInitialForm(initialState));
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    mapStateToForm(state, form, validate).then(setForm);
  }, []);

  useEffect(() => {
    if (resetFlag === true) {
      setResetFlag(false);
    } else {
      mapStateToForm(state, form, validate).then(setForm);
    }
  }, [state]);

  return {
    state,
    form,
    async reset() {
      const initialForm = Object.keys(form).reduce((stack, key) => {
        stack[key as keyof T] = {
          touched: false,
          focus: false,
          value: initialState[key as keyof T],
          errors: [],
        };
        return stack;
      }, {} as FormState<T>);

      const nextForm = await mapStateToForm(
        initialState,
        initialForm,
        validate,
        {}
      );

      setResetFlag(true);
      setState(initialState);
      setForm(nextForm);
      return nextForm;
    },
    async pushFormErrors(errors) {
      const touchedValues = Object.keys(form).reduce((stack, key) => {
        stack[key as keyof T] = { ...form[key as keyof T], touched: true };
        return stack;
      }, {} as FormState<T>);

      const values = await mapStateToForm(
        state,
        touchedValues,
        validate,
        errors
      );

      const success =
        Object.values(values)
          .map(({ errors }) => errors)
          .flat().length === 0;

      setForm(values);
      return { form, success };
    },
    setFormState: (nextState) => setState({ ...state, ...nextState }),
    setFormFocus: (key) =>
      setForm({ ...form, [key]: { ...form[key], focus: true } }),
    setFormBlur: (key) =>
      setForm({
        ...form,
        [key]: { ...form[key], focus: false, touched: true },
      }),
    mapToFormInputs(formLabels) {
      return Object.keys(formLabels).reduce((stack, key) => {
        (stack as any)[key] = {
          label: formLabels[key as keyof T],
          error:
            (form[key as keyof T]?.touched &&
              !!form[key as keyof T]?.errors?.length) ??
            false,
          helperText: form[key as keyof T]?.touched
            ? form[key as keyof T]?.errors[0] ?? ""
            : "",
          onBlur: () => this.setFormBlur(key as keyof T),
          onChange: (value: unknown) =>
            this.setFormState({ [key as keyof T]: value } as Partial<T>),
          onFocus: () => this.setFormFocus(key as keyof T),
          value: form[key as keyof T]?.value ?? "",
        };
        return stack;
      }, {} as ReturnType<UseForm<T>["mapToFormInputs"]>);
    },
  };
}

async function mapStateToForm<T extends Object>(
  state: T,
  values: FormState<T>,
  validate: (form: T) => Promise<FormErrorMap<T>>,
  errors?: FormErrorMap<T>
): Promise<FormState<T>> {
  const currentErrors = errors ?? (await validate(state));

  return Object.keys(state).reduce((stack, key) => {
    stack[key as keyof T] = {
      ...values[key as keyof T],
      value: state[key as keyof T],
      errors: (currentErrors as FormErrorMap<T>)[key as keyof T] ?? [],
    };
    return stack;
  }, {} as FormState<T>);
}

function getInitialForm<T>(state: T) {
  return Object.keys(state).reduce((stack, key) => {
    stack[key as keyof T] = {
      value: state[key as keyof T],
      focus: false,
      touched: false,
      errors: [],
    };
    return stack;
  }, {} as FormState<T>);
}
