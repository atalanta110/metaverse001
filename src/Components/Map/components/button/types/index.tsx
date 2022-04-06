import { IIconProps } from "../../icons/types";

export interface IButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?:
    | React.MouseEventHandler<HTMLButtonElement>
    | (() => void)
    | undefined;
  type?: JSX.IntrinsicElements["button"]["type"];
  ariaLabel?: JSX.IntrinsicElements["button"]["aria-label"];
}

export type IIconButtonProps = Omit<
  Partial<IIconProps> & IButtonProps,
  "children"
>;
