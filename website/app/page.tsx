import { Fragment } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import Pricing from "./components/pricing";
import Footer from "./components/footer";
import CaseStudies from "./components/casestudies";
import Blog from "./components/blog";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <CaseStudies />
      <Blog />
      <Footer />
    </Fragment>
  );
}
