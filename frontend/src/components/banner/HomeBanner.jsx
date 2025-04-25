import React from "react";
import "./homeBanner.scss";

const HomeBanner = () => {
  return (
    <section class="flex home-banner">
      <div class="banner-left">
        <img
          src="./images/banner-img.jpeg"
          alt=""
          className="img-banner"
          style={{ height: "20rem" }}
        />
      </div>
      <div className="banner-center"></div>
      <div class="banner-right flex">
        <h1>Empowering Beekeepers with AI.</h1>
        <h3 style={{ color: "indigo", fontWeight: 400 }}>
          Monitor your bees, Remotely!
        </h3>
        <h5
          style={{
            fontWeight: 350,
            wordSpacing: "4px",
            letterSpacing: "1px",
            margin: "2rem 0",
          }}
        >
          An initiative by Computer Engineering students from College of
          Technology, Pantnagar. This project monitors the real-time data
          collected directly from the Bee Hives with advanced image
          classification and video monitoring techniques resulting in effective
          bee management and thus enhancing the bee health, efficiency of
          pollination and the honey production.
        </h5>
      </div>
    </section>
  );
};

export default HomeBanner;
