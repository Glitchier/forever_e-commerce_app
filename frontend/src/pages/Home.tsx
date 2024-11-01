import { lazy } from "react";

const Hero = lazy(() => import("../components/Hero"));
const BestSeller = lazy(() => import("../components/BestSeller"));
const LatestCollection = lazy(() => import("../components/LatestCollection"));
const NewsletterBox = lazy(() => import("../components/NewsletterBox"));
const OurPolicy = lazy(() => import("../components/OurPolicy"));
const SearchBar = lazy(() => import("../components/SearchBar"));

const Home = () => {
  return (
    <div
      id="home"
      className="flex flex-col justify-center items-center mt-14 gap-14"
    >
      <SearchBar />
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
