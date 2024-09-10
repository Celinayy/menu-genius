import { TextField, TextFieldProps } from "@mui/material";

export type ProductSearchTextFieldProps = TextFieldProps;

const ProductSearchTextField = (props: ProductSearchTextFieldProps) => {
  return <TextField {...props} fullWidth />;
};

export default ProductSearchTextField;
