import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomCarousel.css";
import { Avatar, Col } from "antd";
import { ReactComponent as DefaultIcon } from "../../assets/icons/default.svg";
import { baseUrl } from "../../commonUtils/commonUtils";

const CustomCarousel = (props) => {
  const { products = [] } = props;
  console.log("🚀 ~ CustomCarousel ~ products:", products)
  const CustomNextArrow = ({ onClick }) => (
    <Col className="custom-arrow next" onClick={onClick}>
      <RightOutlined />
    </Col>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <Col className="custom-arrow prev" onClick={onClick}>
      <LeftOutlined />
    </Col>
  );

   //  const { products } = useSelector(homepageSelector);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,

    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <>
      <Col className="crouselContainer">
        <Slider {...settings}>
          {products?.map((item, index) => {
            return (
              <Col key={index} className="cardComponent">
                {/* {item.badge_option && (
                  <Tag
                    className={`productTag ${
                      item.badge_option !== "Sold Out" ? "" : "productTagSold"
                    }`}
                  >
                    {item.badge_option}
                  </Tag>
                )} */}
                <Avatar
                  shape="square"
                  src={`${baseUrl}${item?.image}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                  }}
                  icon={<DefaultIcon />}
                  // alt="items"
                  // classaNme={`productImage ${
                  //   item.badge_option ? "" : "imageMArgin"
                  // }`}
                  // style={{
                  //   opacity: item.badge_option === "Sold Out" ? 0.3 : "",
                  // }}
                />
                {/* {item.vendor_selling_price ? (
                  <Button
                    className={` ${
                      item.badge_option === "Sold Out"
                        ? "cardAddButton"
                        : "cardNotifyButton"
                    }`}
                  >
                    {item.badge_option === "Sold Out" ? "ADD" : "Notify"}
                  </Button>
                ) : (
                  <Button className="cardNotifyButton">Request price</Button>
                )}
                <Col className="productDescription">{item.item_name_title}</Col> */}
                {/* {item.vendor_selling_price && (
                  <Col className="productPriceRow">
                    <span className="productOfferPrice">
                      ₹ {(+item.vendor_selling_price).toFixed(2)}
                    </span>
                    <span className="productBeforePrice">
                      ₹ {(+item.maximum_retail_price).toFixed(2)}
                    </span>
                    <span
                      className="itemDiscount"
                      style={{ fontWeight: 700, color: "#34b439" }}
                    >
                      {item.discount}% off
                    </span>
                  </Col>
                )} */}

                <Col className="productsRatingCol">
                  <Col className="productRating">
                    {/* <Image
                      src={GoldenStar}
                      height={14}
                      width={14}
                      alt="star"
                      className="iconRating"
                    /> */}
                    {item.rating}
                  </Col>
                  <Col className="productRating">
                    {/* <Image
                      src={Points}
                      height={14}
                      width={14}
                      alt="points"
                      className="iconRating"
                    /> */}
                    {item.points}
                  </Col>
                </Col>
                {/* <Col className="productDeals">
                  5 more deals <DownOutlined className="downOutlinedIcon" />
                </Col> */}
                {/* <Button
                  className={` ${
                    item.delivery_options === "Delivery by evening"
                      ? "deliveryStatusButton"
                      : "deliveryTodayStatusButton"
                  }`}
                  style={{ marginTop: item.vendor_selling_price ? "" : "30px" }}
                >
                  {item.delivery_options}
                </Button> */}
              </Col>
            );
          })}
        </Slider>
      </Col>
    </>
  );
};

export default CustomCarousel;
