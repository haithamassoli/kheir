import { vs } from "@utils/platform";
import { Controller, Control } from "react-hook-form";
import { TextInput, HelperText } from "react-native-paper";

type ControlledInputProps = {
  control: Control<any>;
  name: string;
  width?: string | number;
  defaultValue?: string;
} & React.ComponentProps<typeof TextInput>;

const ControlledInput = ({
  control,
  name,
  width,
  defaultValue,
  ...textInputProps
}: ControlledInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error, invalid },
      }) => (
        <>
          <TextInput
            {...textInputProps}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChange}
            onBlur={onBlur}
            error={invalid}
          />
          {error && (
            <HelperText
              type="error"
              visible={invalid}
              style={{
                fontFamily: "CairoReg",
                textAlignVertical: "top",
                textAlign: "left",
                width: width || "86%",
              }}
            >
              {error?.message}
            </HelperText>
          )}
        </>
      )}
    />
  );
};

export default ControlledInput;
