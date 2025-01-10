const CardImage = ({ imageUrl, serviceName }) => {
  return (
    <div
      className="lg:w-[300px] lg:h-[300px] w-full border-black flex-shrink-0"
      data-aos="fade-right"
    >
      <img
        src={imageUrl}
        alt={serviceName}
        className="lg:w-[300px] lg:h-[300px] w-full h-72 object-cover"
      />
    </div>
  );
};
export default CardImage;
