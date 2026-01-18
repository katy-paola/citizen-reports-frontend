type ToastType = "info" | "success" | "error";

type ShowToastFn = (message: string, type: ToastType, visible: boolean) => void;

let showToast: ShowToastFn | null = null;

export const toast = {
  info(message: string) {
    showToast?.(message, "info", true);
  },
  success(message: string) {
    showToast?.(message, "success", true);
  },
  error(message: string) {
    showToast?.(message, "error", true);
  },
};

export const registerToast = (fn: ShowToastFn) => {
  showToast = fn;
};
