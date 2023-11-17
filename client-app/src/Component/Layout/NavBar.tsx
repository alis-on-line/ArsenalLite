import { Button, Container, Menu } from "semantic-ui-react";
import logo from "./../../assets/arsenal.svg";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface INavBar {
  openForm: (id?: number) => void;
}

const NavBar: FC<INavBar> = ({ openForm }) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img src={logo} alt="logo" style={{ marginRight: 10 }} />
          Arsenal lite
        </Menu.Item>
        <Menu.Item as={NavLink} to="/Dashboard" name="Squad"></Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => openForm()}
            positive
            content="Add a player"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};
export default NavBar;
