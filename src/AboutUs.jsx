/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
          About Us
        </h1>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Welcome to Our Blog
          </h2>
          <p className="mb-4 text-gray-700">
            Welcome to our blog! We are a team of passionate writers and
            creators who love sharing our thoughts, experiences, and knowledge
            with the world. Our mission is to inspire, inform, and entertain our
            readers through high-quality content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            What is a Blog?
          </h2>
          <p className="mb-4 text-gray-700">
            A blog is an online journal or informational website displaying
            information in reverse chronological order, with the latest posts
            appearing first. It is a platform where writers or groups of writers
            share their views on individual subjects.
          </p>
          <p className="mb-4 text-gray-700">
            Blogs are a great way to express oneself, share knowledge, and
            connect with a broader audience. They cover a wide range of topics,
            from personal experiences to professional insights, and can be a
            powerful tool for community building.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Our Mission
          </h2>
          <p className="mb-4 text-gray-700">
            Our mission is to create a platform that not only provides valuable
            information but also fosters a sense of community among our readers.
            We aim to:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>Inspire through storytelling and personal experiences.</li>
            <li>Inform with well-researched and accurate content.</li>
            <li>Entertain with engaging and relatable articles.</li>
          </ul>
          <p className="mb-4 text-gray-700">
            We believe that by sharing knowledge and experiences, we can help
            our readers grow, learn, and feel connected.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Meet the Team
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                John Doe - Founder & Chief Editor
              </h3>
              <p className="text-gray-700">
                John is a seasoned writer with over 10 years of experience in
                the blogging industry. He oversees all content on the blog,
                ensuring it meets our high standards.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Jane Smith - Senior Writer
              </h3>
              <p className="text-gray-700">
                Jane specializes in technology and lifestyle topics. Her
                in-depth articles and unique perspective make her a valuable
                asset to our team.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Emily Johnson - Content Strategist
              </h3>
              <p className="text-gray-700">
                Emily is responsible for planning and executing our content
                strategy. She ensures that our articles are not only engaging
                but also aligned with our readers' interests.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Contact Us
          </h2>
          <p className="mb-4 text-gray-700">
            We love hearing from our readers! If you have any questions,
            comments, or suggestions, feel free to reach out to us at{" "}
            <a href="mailto:contact@ourblog.com" className="text-blue-500">
              contact@ourblog.com
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Follow Us
          </h2>
          <p className="mb-4 text-gray-700">
            Stay updated with our latest posts and activities by following us on
            social media:
          </p>
          <ul className="list-none text-gray-700">
            <li>
              <Link to="https://facebook.com" className="text-blue-500">
                Facebook
              </Link>
            </li>
            <li>
              <Link to="https://twitter.com" className="text-blue-500">
                Twitter
              </Link>
            </li>
            <li>
              <Link to="https://instagram.com" className="text-blue-500">
                Instagram
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
