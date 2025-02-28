
const Footer = () => {
  return (
    <footer className="py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} FilmFinder. Все права защищены.</p>
          <p className="mt-1">Поиск фильмов по описанию с использованием ИИ.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
