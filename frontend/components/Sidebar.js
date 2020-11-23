import Link from "next/link"


const Sidebar = () => {
 return (
      <nav className="side__nav__column">
      <ul className="side__nav__list">
        <li className="sidenav__list__item">
          <Link href="/">
          <a  className="list__item__button present">Home</a>
          </Link>
        </li>
        <li className="sidenav__list__item">
          <Link href="/stories" >
          <a className="list__item__button ">Stories</a>
          </Link>
        </li>
        <li className="sidenav__list__item">
          <Link href="/podcasts" >
          <a className="list__item__button ">Podcasts</a>
          </Link>
        </li>
        <li className="sidenav__list__item">
          <Link href="/bookmarks" >
          <a className="list__item__button ">Bookmarks</a>
          </Link>
        </li>
      </ul>
    </nav>
 );
};

export default Sidebar;