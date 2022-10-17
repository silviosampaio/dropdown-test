import { useState } from "react";
import { cleanup, render, fireEvent, screen } from "@testing-library/react";
import Dropdown, { DropdownItem } from "../";

const DropdownMock = ({
  onSelectItem = () => {},
}: {
  onSelectItem?: () => void;
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleToggleIsOpened = () => {
    setIsOpened(!isOpened);
  };
  return (
    <Dropdown
      isOpened={isOpened}
      onToggle={handleToggleIsOpened}
      onSelectItem={onSelectItem}
    >
      <DropdownItem value={1}>Menu 1</DropdownItem>
      <DropdownItem value={2}>Menu 2</DropdownItem>
      <DropdownItem value={3}>Menu 3</DropdownItem>
      <DropdownItem anchor="#menu-4">Menu 4</DropdownItem>
    </Dropdown>
  );
};

describe("Dropdown tests", () => {
  afterAll(cleanup);

  it("should open/close (toggle) items by click", async () => {
    const { getByRole } = render(<DropdownMock />);
    fireEvent.click(getByRole("menu"));

    expect(await screen.findByRole("group")).toBeVisible();
    expect(await screen.findAllByRole("option")).toHaveLength(4);
  });

  it("should open/close (toggle) items by press space", async () => {
    render(<DropdownMock />);
    fireEvent.keyDown(document, {
      key: " ",
      code: "Space",
    });

    fireEvent.keyUp(document, {
      key: " ",
      code: "Space",
    });

    expect(await screen.findByRole("group")).toBeVisible();
    expect(await screen.findAllByRole("option")).toHaveLength(4);
  });

  it("should navigate with keyboard (ArrowUp, ArrowDown)", async () => {
    render(<DropdownMock />);
    fireEvent.keyDown(document, {
      key: " ",
      code: "Space",
    });

    fireEvent.keyUp(document, {
      key: " ",
      code: "Space",
    });

    const options = await screen.findAllByRole("option");

    // navigate to the first element
    fireEvent.keyDown(document, {
      key: "ArrowDown",
      code: "ArrowDown",
    });

    fireEvent.keyUp(document, {
      key: "ArrowDown",
      code: "ArrowDown",
    });

    expect(options[0]).toHaveClass("focused");

    // navigate to the last element
    fireEvent.keyDown(document, {
      key: "ArrowUp",
      code: "ArrowUp",
    });

    fireEvent.keyUp(document, {
      key: "ArrowUp",
      code: "ArrowUp",
    });

    expect(options[options.length - 1]).toHaveClass("focused");
  });

  it("should select item by click", async () => {
    const handleOnSelectItemFn = jest.fn();
    const { getByRole } = render(
      <DropdownMock onSelectItem={handleOnSelectItemFn} />
    );

    fireEvent.click(getByRole("menu"));

    const options = await screen.findAllByRole("option");
    fireEvent.click(options[0]);

    expect(handleOnSelectItemFn).toBeCalled();
  });

  it("should select item by press enter", async () => {
    const handleOnSelectItemFn = jest.fn();
    const { getByRole } = render(
      <DropdownMock onSelectItem={handleOnSelectItemFn} />
    );

    fireEvent.click(getByRole("menu"));

    // navigate to the first element
    fireEvent.keyDown(document, {
      key: "ArrowDown",
      code: "ArrowDown",
    });

    fireEvent.keyUp(document, {
      key: "ArrowDown",
      code: "ArrowDown",
    });

    // press enter key on the first element
    fireEvent.keyDown(document, {
      key: "Enter",
      code: "Enter",
    });

    expect(handleOnSelectItemFn).toBeCalled();
  });

  it("should change URL anchor, if is there an option", async () => {
    const handleOnSelectItemFn = jest.fn();
    const { getByRole } = render(
      <DropdownMock onSelectItem={handleOnSelectItemFn} />
    );

    fireEvent.click(getByRole("menu"));

    const options = await screen.findAllByRole("option");
    fireEvent.click(options[options.length - 1]);

    expect(window.location.hash).toBe("#menu-4");
  });
});
