import {
  cloneElement,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DropdownButton, DropdownItemWrapper } from "../components";
import { Directions } from "../types";

import colours from "../assets/colours";
import { MoreIcon } from "../assets/moreIcons";
import { useKeyPress } from "../hooks/useKeyPress";

interface DropdownProps {
  children: ReactElement[];
  isOpened: boolean;
  direction?: Directions;
  onToggle?: () => void;
  onSelectItem?: (value: unknown) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  isOpened = false,
  direction = "ltr",
  onToggle = () => {},
  onSelectItem = () => {},
}: DropdownProps) => {
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(isOpened);
  const [dropdownFocusedItem, setDropdownFocusedItem] = useState<number>(-1);
  const listLength = useMemo(() => children.length, [children]);

  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const spacePressed = useKeyPress(" ");
  const enterPressed = useKeyPress("Enter");

  const handleOnToggle = () => {
    onToggle();
  };

  const handleOnSelectItem = (index: number) => {
    const {
      props: { anchor, value },
    } = children[index];

    // IF IS VALUE
    if (value) onSelectItem(value);

    // IF IS ANCHOR
    if (anchor) window.location.hash = anchor;
  };

  useEffect(() => {
    setDropdownOpened(isOpened);
    setDropdownFocusedItem(-1);
  }, [isOpened]);

  useEffect(() => {
    // TOGGLE BY SPACEBAR
    if (spacePressed) {
      handleOnToggle();
      setDropdownOpened(!dropdownOpened);
    }

    // KEYUP
    if (arrowUpPressed) {
      setDropdownFocusedItem(
        dropdownFocusedItem !== 0 ? dropdownFocusedItem - 1 : listLength - 1
      );
    }

    // KEYDOWN
    if (arrowDownPressed) {
      setDropdownFocusedItem(
        dropdownFocusedItem !== listLength - 1 ? dropdownFocusedItem + 1 : 0
      );
    }

    // ENTER AND ITEM SELECTED
    if (enterPressed && dropdownFocusedItem !== -1) {
      handleOnSelectItem(dropdownFocusedItem);
    }
  }, [arrowUpPressed, arrowDownPressed, spacePressed, enterPressed]);

  return (
    <>
      <DropdownButton onClick={handleOnToggle}>
        <MoreIcon size={30} color={colours.white100} />
      </DropdownButton>
      {dropdownOpened && (
        <DropdownItemWrapper direction={direction}>
          {children?.map((child, index) =>
            cloneElement(child, {
              key: index,
              className: dropdownFocusedItem === index ? "focused" : "",
              onClick: () => handleOnSelectItem(index),
            })
          )}
        </DropdownItemWrapper>
      )}
    </>
  );
};

export default Dropdown;
