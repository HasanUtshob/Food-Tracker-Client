import React from "react";
import Banner from "../component/Banner";
import NearlyExpire from "../component/NearlyExpire";
import ExpiredFoods from "../component/ExpiredFoods";
import ExtraSection from "../component/ExtraSection";
const Home = () => {
  return (
    // Banner Section

    <>
      <section>
        <Banner></Banner>
      </section>

      <section>
        <NearlyExpire></NearlyExpire>
      </section>

      <section>
        <ExpiredFoods></ExpiredFoods>
      </section>

      <section>
        <ExtraSection></ExtraSection>
      </section>
    </>
  );
};

export default Home;
