import { useStore } from "@zustand/store";
import { useEffect, useState } from "react";
import { Snackbar as PSnackbar } from "react-native-paper";

const Snackbar = () => {
  const { snackbarText, setSnackbarText } = useStore((state) => state);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (snackbarText) {
      setVisible(true);
    }
  }, [snackbarText]);

  const onDismiss = () => {
    setVisible(false);
    setSnackbarText("");
  };
  return (
    <PSnackbar visible={visible} onDismiss={onDismiss} duration={4000}>
      {snackbarText}
    </PSnackbar>
  );
};

export default Snackbar;
