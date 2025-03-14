import { Portal } from "../Portal";
interface IModal {
  show?: boolean;

  children?: React.ReactNode;
}
export const Modal = ({ show, children }: IModal) => {
  return (
    show && (
      <Portal>
        <div className="fixed  top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-black/50 w-full h-full absolute z-0" />
          <div className="relative z-[1] flex flex-col gap-4 bg-white p-4 rounded">{children}</div>
        </div>
      </Portal>
    )
  );
};
