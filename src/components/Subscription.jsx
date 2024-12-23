const Subscription = () => {
  const plans = [
    {
      id: 1,
      title: "Basic Plan",
      price: "$29/month",
      description:
        "Get basic home repairs for common issues like plumbing, electrical, and minor fixes.",
      features: [
        "Plumbing fixes",
        "Electrical repairs",
        "Minor fixes",
        "Up to 3 repairs per month",
      ],
    },
    {
      id: 2,
      title: "Standard Plan",
      price: "$49/month",
      description:
        "Includes all services from the Basic plan plus more comprehensive repairs.",
      features: [
        "Plumbing fixes",
        "Electrical repairs",
        "Major fixes",
        "Up to 5 repairs per month",
        "Priority customer support",
      ],
    },
    {
      id: 3,
      title: "Premium Plan",
      price: "$79/month",
      description:
        "Unlimited repairs with priority support and exclusive access to top-rated contractors.",
      features: [
        "All basic and standard services",
        "Unlimited repairs",
        "Priority support",
        "Emergency services",
        "Exclusive contractor access",
      ],
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl dark:text-gray-200 font-semibold text-gray-800">
          Home Repair Subscription
        </h1>
        <p className="text-lg dark:text-gray-300 text-gray-600 mt-2">
          Keep your home in top condition with our subscription plans.
        </p>
      </header>

      <section className="text-center mb-16">
        <h2 className="text-3xl dark:text-gray-200 font-semibold text-gray-800 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg dark:text-gray-300 text-gray-600">
          Select the plan that best fits your home repair needs.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:px-12 place-items-center">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 "
            data-aos="fade-up"
            data-aos-delay={`${plan.id * 200}`}
            data-aos-duration="800"
          >
            <div className="bg-blue-500 text-white p-4 text-center">
              <h2 className="text-2xl font-semibold">{plan.title}</h2>
              <p className="text-xl">{plan.price}</p>
            </div>
            <div className="p-6 ">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {plan.description}
              </p>
              <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-gray-50 text-center dark:bg-gray-700">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition">
                Sign Up
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
