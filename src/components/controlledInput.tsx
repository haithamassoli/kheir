import { vs } from "@utils/platform";
import { Controller, Control } from "react-hook-form";
import { TextInput, HelperText } from "react-native-paper";

type ControlledInputProps = {
  control: Control<any>;
  name: string;
  width?: string | number;
  defaultValue?: string;
  withError?: boolean;
} & React.ComponentProps<typeof TextInput>;

const ControlledInput = ({
  control,
  name,
  width,
  defaultValue,
  withError = true,
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
            contentStyle={{
              height: vs(48),
              fontFamily: "CairoBold",
            }}
            {...textInputProps}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChange}
            onBlur={onBlur}
            error={invalid}
          />
          {error && withError && (
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
