const Navbar = () => {
  return (
    <section className="flex justify-between">
      <div className="font-bold cursor-pointer"> 🔐 AuthFlow </div>
      <nav>
        <ul className="flex gap-x-4">
          <li className="cursor-pointer hover:underline">Dashboard</li>
          <li className="cursor-pointer hover:underline">Profile</li>
          <li className="cursor-pointer hover:underline">Logout</li>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
