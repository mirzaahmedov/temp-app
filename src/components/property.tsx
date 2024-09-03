import { Input } from "./ui/input";

type PropertyProps = React.LiHTMLAttributes<HTMLLIElement> & {
  name: string;
  label: string;
  value: string;
};
const Property = (props: PropertyProps) => {
  const { name, label, value, ...rest } = props;
  return (
    <li {...rest}>
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <Input name={name} value={value} className="mt-1.5" />
    </li>
  );
};

export default Property;
