import Link from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && {
      label: "Sign up",
      href: "/auth/signup",
    },

    !currentUser && {
      label: "Sign in",
      href: "/auth/signin",
    },
    currentUser && {
      label: "Sign out",
      href: "/auth/signout",
    },
  ].filter((link) => link);

  return (
    <nav className="navbar navbar-light bg-light">
      <Link
        className="navbar-brand"
        href="/"
      >
        GitTix
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links.map((link) => {
            console.log(link);
            return (
              <li
                className="nav-item"
                key={link.href}
              >
                <Link
                  href={link.href}
                  className="nav-link"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
