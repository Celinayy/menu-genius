import { TextField, TextFieldProps } from "@mui/material";
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  useEffect,
  useState,
} from "react";

export type NumberFieldProps = Omit<TextFieldProps, "value" | "onChange"> & {
  value?: number;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: number
  ) => void;
  onClear?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const numberToString = (value: number | undefined) => {
  return typeof value === "number" ? `${value}` : "";
};

export const NumberField = (props: NumberFieldProps) => {
  const [text, setText] = useState(numberToString(props.value));

  useEffect(() => {
    if (text === numberToString(props.value)) {
      return;
    }

    setText(numberToString(props.value));
  }, [props.value]);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setText(e.target.value);

    if (e.target.value === "") {
      props.onClear?.(e);
    } else {
      const newValue = +e.target.value;
      if (!isNaN(newValue)) {
        props.onChange?.(e, newValue);
      }
    }
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(numberToString(props.value));
    props.onBlur?.(event);
  };

  return (
    <TextField
      {...props}
      type={"number"}
      onChange={handleChange}
      onBlur={handleBlur}
      value={text}
    />
  );
};
