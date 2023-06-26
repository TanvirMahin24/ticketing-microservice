import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import React, { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import AppConfig from "../layout/AppConfig";
import { LayoutContext } from "../layout/context/layoutcontext";

const LandingPage = ({ currentUser, data }) => {
  const { layoutConfig } = useContext(LayoutContext);
  const router = useRouter();
  return (
    <div className="surface-0 ">
      <div id="home" className="landing-wrapper overflow-hidden">
        <Navbar currentUser={currentUser} />
        <div
          id="hero"
          className="flex flex-column pt-4 px-4 overflow-hidden"
          style={{
            background:
              "linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%)",
            clipPath: "ellipse(150% 87% at 93% 13%)",
          }}
        >
          <div className="mx-4 md:mx-8 mt-0 md:mt-4">
            <h1 className="text-6xl font-bold text-gray-900 line-height-2 pt-5 pb-8 text-center">
              <span className="font-light block">
                Buy available tickets now!{" "}
              </span>
            </h1>
          </div>
        </div>

        <div id="features" className="py-4 px-8 mt-5 mx-0 ">
          <div className="grid justify-content-center">
            {data?.map((item) => (
              <div
                key={item.id}
                className="col-12 md:col-12 lg:col-3 p-0 lg:pb-5 mt-4 lg:mt-0 px-3"
              >
                <div
                  style={{
                    height: "150",
                    padding: "2px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2))",
                  }}
                >
                  <div
                    className="p-3 surface-card h-full"
                    style={{ borderRadius: "8px" }}
                  >
                    <h5 className="mb-2 text-900">{item.title}</h5>
                    <span className="text-600">${item.price}</span>
                    <div className="pt-3">
                      <Button
                        label="View"
                        onClick={() => router.push(`/tickets/${item.id}`)}
                      ></Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-4 px-4 mx-0 mt-8 lg:mx-8">
          <div className="grid justify-content-between">
            <div className="col-12 md:col-2" style={{ marginTop: "-1.5rem" }}>
              <Link
                href="/"
                className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer"
              >
                <img
                  src={`/layout/images/${
                    layoutConfig.colorScheme === "light"
                      ? "logo-dark"
                      : "logo-white"
                  }.svg`}
                  alt="footer sections"
                  width="50"
                  height="50"
                  className="mr-2"
                />
                <span className="font-medium text-3xl text-900">SAKAI</span>
              </Link>
            </div>

            <div className="col-12 md:col-10 lg:col-7">
              <div className="grid text-center md:text-left">
                <div className="col-12 md:col-3">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">
                    Company
                  </h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    About Us
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    News
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Investor Relations
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Careers
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">
                    Media Kit
                  </a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">
                    Resources
                  </h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Get Started
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Learn
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">
                    Case Studies
                  </a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">
                    Community
                  </h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Discord
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Events
                    <img
                      src="/demo/images/landing/new-badge.svg"
                      className="ml-2"
                      alt="badge"
                    />
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    FAQ
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">
                    Blog
                  </a>
                </div>

                <div className="col-12 md:col-3 mt-4 md:mt-0">
                  <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">
                    Legal
                  </h4>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Brand Policy
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                    Privacy Policy
                  </a>
                  <a className="line-height-3 text-xl block cursor-pointer text-700">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LandingPage.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
      <AppConfig simple />
    </React.Fragment>
  );
};

LandingPage.getInitialProps = async (ctx, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { data };
};

export default LandingPage;
