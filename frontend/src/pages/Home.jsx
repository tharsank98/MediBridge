import { Header } from "../components/Header";
import Searchbar from "../components/Searchbar";

export const Home = () => {
  const handleSearch = (query) => {
    console.log("Search Query:", query);
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  };

  return (
    <>
      <Searchbar onSearch={handleSearch} />
      <Header />
    </>
  );
};