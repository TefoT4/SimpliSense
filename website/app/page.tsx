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
      <section id="features">
        <Features />
      </section>
      <section id="how-it-works">
        <CaseStudies />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="blog">
        <Blog />
      </section>
      <section className="container mx-auto">
        <h2>Button Component Demo</h2>
      </section>
      <Footer />
    </Fragment>
  );
}
