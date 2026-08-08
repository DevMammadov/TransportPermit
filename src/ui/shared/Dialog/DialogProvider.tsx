import { useCallback, useState } from "react";
import Alert from "./Alert";
import Callback from "./Callback";
import { DialogContext } from "./Dialog.context";
import Prompt from "./Prompt";
import {
  TDialogAlert,
  TDialogCallback,
  TDialogCloseReason,
  TDialogPrompt,
  TDialogProvider,
  TDialogState,
  TDialogTypes,
  TResolve,
  TResolver,
} from "./TDialog";
import { EDialogTypes } from "./helpers";

const DialogProvider: React.FC<TDialogProvider> = ({ children }) => {
  const [dialogState, setDialogState] = useState<TResolve>({ resolve: null });
  const [dialogProps, setDialogProps] = useState<TDialogState>();

  const handleCloseDialog = useCallback(
    (
      dialog: TDialogTypes,
      ok: boolean,
      reason: TDialogCloseReason,
      value?: string,
    ) => {
      dialogState.resolve?.({ ok, reason, value });
      setDialogState({ resolve: null });

      setTimeout(() => {
        setDialogProps((prev) => ({
          ...prev,
          [dialog]: undefined,
        }));
      }, 300);
    },
    [dialogState],
  );

  const alert = useCallback(
    (
      title?: string,
      text?: string,
      props?: Partial<TDialogAlert>,
    ): Promise<TResolver> => {
      return new Promise<TResolver>((resolve) => {
        setDialogState({ resolve, type: EDialogTypes.ALERT });
        setDialogProps((prev) => ({
          ...prev,
          alert: {
            title,
            text,
            ...props,
          },
        }));
      });
    },
    [],
  );

  const callback = useCallback(
    (text?: string, props?: Partial<TDialogCallback>) => {
      return new Promise<TResolver>((resolve) => {
        setDialogState({ resolve, type: EDialogTypes.CALLBACK });
        setDialogProps((prev) => ({
          ...prev,
          callback: { text, ...props },
        }));
      });
    },
    [],
  );

  const prompt = useCallback(
    (title?: string, label?: string, props?: Partial<TDialogPrompt>) => {
      return new Promise<TResolver>((resolve) => {
        setDialogState({ resolve, type: EDialogTypes.PROMPT });
        setDialogProps((prev) => ({
          ...prev,
          prompt: {
            title,
            label,
            ...props,
          },
        }));
      });
    },
    [],
  );

  return (
    <DialogContext.Provider value={{ alert, callback, prompt }}>
      {children}
      <Alert
        {...dialogProps?.alert}
        open={dialogState.type === EDialogTypes.ALERT || false}
        onCancel={() => handleCloseDialog("alert", false, "cancel")}
        onClose={() => handleCloseDialog("alert", false, "close")}
        onOk={(val) => handleCloseDialog("alert", true, "ok", val)}
      />

      <Callback
        {...dialogProps?.callback}
        open={dialogState.type === EDialogTypes.CALLBACK || false}
        onClose={() => handleCloseDialog("callback", true, "ok")}
      />

      <Prompt
        {...dialogProps?.prompt}
        open={dialogState.type === EDialogTypes.PROMPT || false}
        onClose={() => handleCloseDialog("prompt", false, "close")}
        onCancel={() => handleCloseDialog("prompt", false, "cancel")}
        onOk={() =>
          handleCloseDialog("prompt", true, "ok", dialogProps?.prompt?.value)
        }
        onChange={(val) =>
          setDialogProps({ prompt: { ...dialogProps?.prompt, value: val } })
        }
        value={dialogProps?.prompt?.value}
      />
    </DialogContext.Provider>
  );
};

export default DialogProvider;
