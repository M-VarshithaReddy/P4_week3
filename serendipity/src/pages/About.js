import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About - Serendipity"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">


At Serendipity, we believe that every piece of jewelry tells a story—a story of love, celebration, and timeless elegance. For years, we have been crafting exquisite jewelry that combines unmatched craftsmanship, high-quality materials, and unique designs to help you mark life's most precious moments.  

At Serendipity, we don't just create jewelry—we craft heirlooms that will be cherished for a lifetime. Discover the perfect piece to tell your story today.  

          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;