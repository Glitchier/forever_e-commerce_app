import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t mt-14">
        <Title txt1="About" txt2="Us" />
      </div>
      <div className="my-10 flex flex-col lg:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="about"
          className="rounded w-full lg:max-w-[480px]"
        />
        <div className="flex flex-col justify-center gap-6 lg:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of thier homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an exclusive collection sourced from trusted
            brands and suppliers.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title txt1="Why" txt2="Choose us" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 gap-2">
        <div className="border rounded px-6 md:px-10 py-8 sm:py-12 flex flex-col gap-6">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
            nulla ex molestias modi cumque eveniet, facilis sunt.
          </p>
        </div>
        <div className="border rounded px-6 md:px-10 py-8 sm:py-12 flex flex-col gap-6">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            architecto a possimus, facilis accusantium voluptatem.
          </p>
        </div>
        <div className="border rounded px-6 md:px-10 py-8 sm:py-12 flex flex-col gap-6">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora,
            vero nemo. Tempore consectetur ullam odit perferendis sint illo
            commodi doloremque.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
