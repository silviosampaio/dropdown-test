import React, { useState } from "react";
import Dropdown, { DropdownItem } from "../../components/dropdown";

const Home: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleToggleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Dropdown
        isOpened={isOpened}
        onToggle={handleToggleIsOpened}
        onSelectItem={(value) => console.log(value)}
      >
        <DropdownItem value={1}>Menu 1</DropdownItem>
        <DropdownItem value={2}>Menu 2</DropdownItem>
        <DropdownItem value={3}>Menu 3</DropdownItem>
        <DropdownItem anchor="#menu-4">Menu 4</DropdownItem>
      </Dropdown>
    </div>
  );
};

export default Home;
