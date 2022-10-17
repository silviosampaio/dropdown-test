import styled from "styled-components";
import colours from "../assets/colours";
import { Directions } from "../types";

/**
 * PROPS
 */
interface DropdownItemWrapperProps {
  direction: Directions;
}

interface DropdownItemProps {
  value?: unknown;
  anchor?: string;
}

/**
 * COMPONENTS
 */
export const DropdownButton = styled.div.attrs((_) => ({
  role: "menu",
}))`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${colours.black200};

  :hover {
    cursor: pointer;
    background-color: ${colours.black100};
  }
`;

export const DropdownItemWrapper = styled.ul.attrs((_) => ({
  role: "group",
}))<DropdownItemWrapperProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 9999;
  top: 50px;
  padding: 0;
  margin: 0;
  background-color: ${colours.black200};
`;

export const DropdownItem = styled.li.attrs((_) => ({
  role: "option",
  tabIndex: 0,
}))<DropdownItemProps>`
  display: flex;
  padding: 10px 20px;
  min-width: 100px;
  color: ${colours.white100};
  font-family: sans-serif;

  :hover,
  :focus,
  &.focused {
    cursor: pointer;
    background-color: ${colours.blue100};
  }
`;
