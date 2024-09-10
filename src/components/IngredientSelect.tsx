import { trpc } from "@/trpc/client";
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  InputLabel,
  ListItemText,
  SelectProps,
} from "@mui/material";
import { useId } from "react";

export type IngredientSelectProps = SelectProps<string[]>;

const IngredientSelect = (props: IngredientSelectProps) => {
  const { data } = trpc.ingredient.list.useQuery({});

  const id = useId();

  const label = "Szűrő";
  const labelId = `ingredient-select-${id}-label`;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>

      <Select
        label={label}
        labelId={labelId}
        multiple
        renderValue={(selectedIds) =>
          selectedIds
            .map(
              (selectedId) =>
                data?.find((ingredient) => ingredient.id === selectedId)!.name
            )
            .join(", ")
        }
        {...props}
      >
        {data?.map((ingredient) => (
          <MenuItem key={ingredient.id} value={ingredient.id}>
            <Checkbox checked={props.value?.includes(ingredient.id)} />
            <ListItemText primary={ingredient.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default IngredientSelect;
