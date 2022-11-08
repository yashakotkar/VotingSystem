import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

const UserNavbar = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("/");

  const logout = (e) => {
    e.preventDefault();
    router.push("/user/login");
  };

  return (
    <div>
      <Menu pointing secondary vertical>
        <Link href="/user/">
          <Menu.Item name="Information" active={activeItem === "/"} />
        </Link>
        <Link href="/user/registration">
          <Menu.Item
            name="Voter Registration"
            active={activeItem === "Voter Registration"}
          />
        </Link>
        <Link href="/user/voting-area">
          <Menu.Item name="Voting Area" active={activeItem === "Voting Area"} />
        </Link>
        <Link href="/user/result">
          <Menu.Item name="Result" active={activeItem === "Result"} />
        </Link>
        <Menu.Item
          name="Logout"
          active={activeItem === "Logout"}
          onClick={logout}
        />
      </Menu>
    </div>
  );
};

export default UserNavbar;
