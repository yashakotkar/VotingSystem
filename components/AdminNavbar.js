import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

const AdminNavbar = (props) => {
  const router = useRouter();

  return (
    <div>
      <Menu pointing secondary vertical>
        <Link href="/admin/">
          <Menu.Item name="home" />
        </Link>
        <Link href="/admin/add-candidate">
          <Menu.Item name="Add Candidate" />
        </Link>

        <Link href="/admin/candidates">
          <Menu.Item name="Candidates" />
        </Link>

        <Link href="/admin/change-phase">
          <Menu.Item name="Change Phase" />
        </Link>

        <Menu.Item
          name="Logout"
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/login");
          }}
        />
      </Menu>
    </div>
  );
};

export default AdminNavbar;
