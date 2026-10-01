import type { TSelect } from "./SelectMenu.type";

const SelectMenu = ({ value, onChange, options }: TSelect) => {
  return (
    <select value={value} onChange={(event) => onChange(event)}>
      {options &&
        options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
    </select>
  );
};

export default SelectMenu;
