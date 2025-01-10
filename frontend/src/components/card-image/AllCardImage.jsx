const AllCardImage = ({ imageUrl, serviceName }) => {
  return (
    <div
      className="lg:w-[450px] lg:h-[350px] w-full border-black flex-shrink-0"
      data-aos="fade-right"
    >
      <img
        src={imageUrl}
        alt={serviceName}
        className="lg:w-[450px] lg:h-[350px] w-full h-72 object-cover"
      />
    </div>
  );
};
export default AllCardImage;
