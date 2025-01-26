import React from "react";
import {Button, Col, Collapse, Modal, Typography} from "antd";
import {useSelector} from "react-redux";
import {sellerCatalogueTableProductSelector} from "../../../redux/slices/sellerCatalogue/selector";
import "./ItemDetailsModal.css";
import CustomCarousel from "../../CustomCarousel/CustomCarousel";

//definition
// const array = [
//   {
//     brand: "Luker",
//     mob_sku: "113LUK425",
//     category: "Electric and lights",
//     sub_category_id: "Bulbs",
//     sub_category_id_2: "Lightbulbs",
//     item_name_title: "Luker FACO High Wattage bulb 30W WH LBPC30",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker FACO High Wattage bulb 30W WH LBPC30",
//     vendor_selling_price: "366.7915776",
//     maximum_retail_price: "590",
//     badge_option: "",
//     delivery_options: "Delivery by evening",
//     discount: 20,
//     points: 97,
//     vendor_count: 1,
//     rating: 3.5,
//     images: [
//       {
//         image: "/media/products/images/113LUK425_Odd7ftk.jpeg",
//         product: 13459,
//         id: 2458,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK426",
//     category: "Electric and lights",
//     sub_category_id: "Bulbs",
//     sub_category_id_2: "Lightbulbs",
//     item_name_title: "Luker FACO High Wattage bulb 30W WW LBPC30",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker FACO High Wattage bulb 30W WW LBPC30",
//     vendor_selling_price: "366.7915776",
//     maximum_retail_price: "590",
//     badge_option: "Sold Out",
//     delivery_options: "Delivery by tomorrow",
//     discount: 80,
//     points: 56,
//     vendor_count: 1,
//     rating: 4.21,
//     images: [
//       {
//         image: "/media/products/images/113LUK426_TRpeXBl.jpeg",
//         product: 13460,
//         id: 2459,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK427",
//     category: "Electric and lights",
//     sub_category_id: "Bulbs",
//     sub_category_id_2: "Lightbulbs",
//     item_name_title: "Luker FACO High Wattage bulb 36W WH LBPC36N",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker FACO High Wattage bulb 36W WH LBPC36N",
//     vendor_selling_price: "397.8756096",
//     maximum_retail_price: "640",
//     badge_option: "30% Off",
//     delivery_options: "Delivery by tomorrow evening",
//     discount: 80,
//     points: 99,
//     vendor_count: 1,
//     rating: 4.7,
//     images: [
//       {
//         image: "/media/products/images/113LUK427_DI1iu5O.JPEG",
//         product: 13461,
//         id: 2460,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK428",
//     category: "Electric and lights",
//     sub_category_id: "Bulbs",
//     sub_category_id_2: "Lightbulbs",
//     item_name_title: "Luker FACO High Wattage bulb 36W WW LBPC36N",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker FACO High Wattage bulb 36W WW LBPC36N",
//     vendor_selling_price: "397.8756096",
//     maximum_retail_price: "640",
//     badge_option: "Bestseller",
//     delivery_options: "Delivery by tomorrow",
//     discount: 10,
//     points: 58,
//     vendor_count: 1,
//     rating: 3.21,
//     images: [
//       {
//         image: "/media/products/images/113LUK428_7G8gLP9.JPEG",
//         product: 13462,
//         id: 2461,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK429",
//     category: "Electric and lights",
//     sub_category_id: "Bulbs",
//     sub_category_id_2: "Lightbulbs",
//     item_name_title: "Luker FACO High Wattage bulb 48W WH LBPC48N",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker FACO High Wattage bulb 48W WH LBPC48N",
//     vendor_selling_price: "484.9108992",
//     maximum_retail_price: "780",
//     badge_option: "",
//     delivery_options: "Delivery by tomorrow",
//     discount: 50,
//     points: 55,
//     vendor_count: 1,
//     rating: 3.17,
//     images: [
//       {
//         image: "/media/products/images/113LUK429_pCeqbdV.JPEG",
//         product: 13463,
//         id: 2462,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK430",
//     category: "Electric and lights",
//     sub_category_id: "Bulbs",
//     sub_category_id_2: "Lightbulbs",
//     item_name_title: "Luker FACO High Wattage bulb 48W WW LBPC48N",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker FACO High Wattage bulb 48W WW LBPC48N",
//     vendor_selling_price: "484.9108992",
//     maximum_retail_price: "780",
//     badge_option: "Sold Out",
//     delivery_options: "Delivery by evening",
//     discount: 60,
//     points: 52,
//     vendor_count: 1,
//     rating: 4.63,
//     images: [
//       {
//         image: "/media/products/images/113LUK430_4BUArNJ.JPEG",
//         product: 13464,
//         id: 2463,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK431",
//     category: "Electric and lights",
//     sub_category_id: "Bulbs",
//     sub_category_id_2: "Lightbulbs",
//     item_name_title: "Luker FOCO Emergency light 9W WH LBGB09CL",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker FOCO Emergency light 9W WH LBGB09CL",
//     vendor_selling_price: "366.7915776",
//     maximum_retail_price: "590",
//     badge_option: "Bestseller",
//     delivery_options: "Delivery by tomorrow evening",
//     discount: 20,
//     points: 78,
//     vendor_count: 1,
//     rating: 4.39,
//     images: [
//       {
//         image: "/media/products/images/113LUK431_szq1k0w.jpeg",
//         product: 13465,
//         id: 2464,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK432",
//     category: "Electric and lights",
//     sub_category_id: "Bulbs",
//     sub_category_id_2: "Lightbulbs",
//     item_name_title: "Luker FOCO Emergency light 12W WH LBGB12CL",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker FOCO Emergency light 12W WH LBGB12CL",
//     vendor_selling_price: "484.9108992",
//     maximum_retail_price: "780",
//     badge_option: "Bestseller",
//     delivery_options: "Delivery by evening",
//     discount: 30,
//     points: 90,
//     vendor_count: 1,
//     rating: 4.21,
//     images: [
//       {
//         image: "/media/products/images/113LUK432_nmWit19.jpeg",
//         product: 13466,
//         id: 2465,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK433",
//     category: "Electric and lights",
//     sub_category_id: "Bulbs",
//     sub_category_id_2: "Lightbulbs",
//     item_name_title: "Luker GIALLO ST64 Filament bulb 4W WW LBFE2704 AM ST64",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description:
//       "Luker GIALLO ST64 Filament bulb 4W WW LBFE2704 AM ST64",
//     vendor_selling_price: "217.588224",
//     maximum_retail_price: "350",
//     badge_option: "30% Off",
//     delivery_options: "Delivery by tomorrow",
//     discount: 50,
//     points: 53,
//     vendor_count: 1,
//     rating: 3.99,
//     images: [
//       {
//         image: "/media/products/images/113LUK433_Xwfo5G0.jpeg",
//         product: 13467,
//         id: 2466,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK434",
//     category: "Electric and lights",
//     sub_category_id: "Bulbs",
//     sub_category_id_2: "Lightbulbs",
//     item_name_title: "Luker GIALLO T225 Filament bulb 4W WW LBFE2704 AM T225",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description:
//       "Luker GIALLO T225 Filament bulb 4W WW LBFE2704 AM T225",
//     vendor_selling_price: "267.3226752",
//     maximum_retail_price: "430",
//     badge_option: "30% Off",
//     delivery_options: "Delivery by evening",
//     discount: 60,
//     points: 57,
//     vendor_count: 1,
//     rating: 3.39,
//     images: [
//       {
//         image: "/media/products/images/113LUK434_aTWOK45.jpeg",
//         product: 13468,
//         id: 2467,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK440",
//     category: "Electric and lights",
//     sub_category_id: "Decorative lighting",
//     sub_category_id_2: "Light tubes",
//     item_name_title: "Luker LUMOS Double Tube Set 36W WH LTH36",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker LUMOS Double Tube Set 36W WH LTH36",
//     vendor_selling_price: "795.7512192",
//     maximum_retail_price: "1280",
//     badge_option: "30% Off",
//     delivery_options: "Delivery by tomorrow evening",
//     discount: 20,
//     points: 82,
//     vendor_count: 1,
//     rating: 4.51,
//     images: [
//       {
//         image: "/media/products/images/113LUK440_VrL4RnW.jpeg",
//         product: 13474,
//         id: 2472,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK441",
//     category: "Electric and lights",
//     sub_category_id: "Decorative lighting",
//     sub_category_id_2: "Light tubes",
//     item_name_title: "Luker LUMOS Double Tube Set 36W WW LTH36",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker LUMOS Double Tube Set 36W WW LTH36",
//     vendor_selling_price: "795.7512192",
//     maximum_retail_price: "1280",
//     badge_option: "Bestseller",
//     delivery_options: "Delivery by tomorrow",
//     discount: 80,
//     points: 64,
//     vendor_count: 1,
//     rating: 3.6,
//     images: [
//       {
//         image: "/media/products/images/113LUK441_djOAJ7B.jpeg",
//         product: 13475,
//         id: 2473,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK442",
//     category: "Electric and lights",
//     sub_category_id: "Decorative lighting",
//     sub_category_id_2: "Light tubes",
//     item_name_title: "Luker LUMOS Double Tube Set 40W WH LTH40",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker LUMOS Double Tube Set 40W WH LTH40",
//     vendor_selling_price: "1230.927667",
//     maximum_retail_price: "1980",
//     badge_option: "Bestseller",
//     delivery_options: "Delivery by tomorrow evening",
//     discount: 60,
//     points: 88,
//     vendor_count: 1,
//     rating: 3.22,
//     images: [
//       {
//         image: "/media/products/images/113LUK442_ZC1H49O.jpeg",
//         product: 13476,
//         id: 2474,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK443",
//     category: "Electric and lights",
//     sub_category_id: "Decorative lighting",
//     sub_category_id_2: "Light tubes",
//     item_name_title: "Luker LUMOS Double Tube Set 40W WW LTH40",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker LUMOS Double Tube Set 40W WW LTH40",
//     vendor_selling_price: "1230.927667",
//     maximum_retail_price: "1980",
//     badge_option: "",
//     delivery_options: "Delivery by evening",
//     discount: 10,
//     points: 84,
//     vendor_count: 1,
//     rating: 3.09,
//     images: [
//       {
//         image: "/media/products/images/113LUK443_LBxjazU.jpeg",
//         product: 13477,
//         id: 2475,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK444",
//     category: "Electric and lights",
//     sub_category_id: "Living room lights",
//     sub_category_id_2: "Ceiling lights",
//     item_name_title: "Luker LUMOS Double Tube Reflector 40W LDSR40",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker LUMOS Double Tube Reflector 40W LDSR40",
//     vendor_selling_price: "217.588224",
//     maximum_retail_price: "350",
//     badge_option: "",
//     delivery_options: "Delivery by evening",
//     discount: 30,
//     points: 75,
//     vendor_count: 1,
//     rating: 4.09,
//     images: [
//       {
//         image: "/media/products/images/113LUK444_GFWNELl.JPEG",
//         product: 13478,
//         id: 2476,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK445",
//     category: "Electric and lights",
//     sub_category_id: "Living room lights",
//     sub_category_id_2: "Ceiling lights",
//     item_name_title: "Luker LUMOS Double Tube Set IP65 36W WH LTOD40",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker LUMOS Double Tube Set IP65 36W WH LTOD40",
//     vendor_selling_price: "1647.453696",
//     maximum_retail_price: "2650",
//     badge_option: "30% Off",
//     delivery_options: "Delivery by tomorrow evening",
//     discount: 70,
//     points: 59,
//     vendor_count: 1,
//     rating: 3.73,
//     images: [
//       {
//         image: "/media/products/images/113LUK445_dSjh75D.JPEG",
//         product: 13479,
//         id: 2477,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK446",
//     category: "Electric and lights",
//     sub_category_id: "Living room lights",
//     sub_category_id_2: "Ceiling lights",
//     item_name_title: "Luker LUMOS Double Tube Set IP65 36W WW LTOD40",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker LUMOS Double Tube Set IP65 36W WW LTOD40",
//     vendor_selling_price: "1647.453696",
//     maximum_retail_price: "2650",
//     badge_option: "30% Off",
//     delivery_options: "Delivery by tomorrow evening",
//     discount: 50,
//     points: 88,
//     vendor_count: 1,
//     rating: 3.61,
//     images: [
//       {
//         image: "/media/products/images/113LUK446_RYifjMS.JPEG",
//         product: 13480,
//         id: 2478,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK447",
//     category: "Electric and lights",
//     sub_category_id: "Decorative lighting",
//     sub_category_id_2: "Light tubes",
//     item_name_title:
//       "Luker LUMOS SENZA 2 feet Tube Set with sensor 9W WH LT809SR",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description:
//       "Luker LUMOS SENZA 2 feet Tube Set with sensor 9W WH LT809SR",
//     vendor_selling_price: "528.428544",
//     maximum_retail_price: "850",
//     badge_option: "30% Off",
//     delivery_options: "Delivery by tomorrow evening",
//     discount: 20,
//     points: 92,
//     vendor_count: 1,
//     rating: 4.84,
//     images: [
//       {
//         image: "/media/products/images/113LUK447_AZei7qz.jpeg",
//         product: 13481,
//         id: 2479,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK448",
//     category: "Electric and lights",
//     sub_category_id: "Decorative lighting",
//     sub_category_id_2: "Light tubes",
//     item_name_title:
//       "Luker LUMOS SENZA 4 feet Tube Set with sensor 18W WH LT818SR",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description:
//       "Luker LUMOS SENZA 4 feet Tube Set with sensor 18W WH LT818SR",
//     vendor_selling_price: "596.8134144",
//     maximum_retail_price: "960",
//     badge_option: "Bestseller",
//     delivery_options: "Delivery by tomorrow",
//     discount: 50,
//     points: 57,
//     vendor_count: 1,
//     rating: 3.96,
//     images: [
//       {
//         image: "/media/products/images/113LUK448_x4ljndg.jpeg",
//         product: 13482,
//         id: 2480,
//       },
//     ],
//   },
//   {
//     brand: "Luker",
//     mob_sku: "113LUK449",
//     category: "Electric and lights",
//     sub_category_id: "LED lighting",
//     sub_category_id_2: "LED ceiling lights",
//     item_name_title: "Luker IRIS LED Surface Panel 3W WH LNPSRS03",
//     model_number: null,
//     manufacturer: "Luker",
//     product_description: "Luker IRIS LED Surface Panel 3W WH LNPSRS03",
//     vendor_selling_price: "335.7075456",
//     maximum_retail_price: "540",
//     badge_option: "Sold Out",
//     delivery_options: "Delivery by evening",
//     discount: 10,
//     points: 98,
//     vendor_count: 1,
//     rating: 3.21,
//     images: [
//       {
//         image: "/media/products/images/113LUK449_MYg1E6j.jpeg",
//         product: 13483,
//         id: 2481,
//       },
//     ],
//   },
// ];
const ItemDetailsModal = ({open, handleOk, handleSave, saveText}) => {
  const {Title, Text} = Typography;
  const rowData = useSelector(sellerCatalogueTableProductSelector);
  console.log("🚀 ~ ItemDetailsModal ~ rowData:", rowData)
  
  const {
    product_description,
    product_bullet_points,
    productName,
    mob_sku,
    hsn_code,
    unit,
    category,
    brand_name,
    sub_category_lvl_1,
    sub_category_lvl_2,
    images,
    is_available,
  } = rowData;

  const productData = [
    {
      key: "1",
      label: (
        <Col style={{borderBottom: "1px solid #dedede"}}>
          {"Product Details"}
        </Col>
      ),
      children: (
        <Col
          style={
            {
              // height: "100px",
              // overflow: "auto",
            }
          }>
          {product_description ||
            ""}
        </Col>
      ),
      //   extra: genExtra(),
    },
  ];

  const specsData = [
    {
      key: "1",
      label: (
        <Col style={{borderBottom: "1px solid #dedede"}}>
          {"Specifications"}
        </Col>
      ),
      children: (
        <Col
          style={
            {
              // height: "100px",
              //  overflow: "auto"
            }
          }>
          {/* {product_bullet_points ||
            ""} */}
             <div
    dangerouslySetInnerHTML={{
      __html: product_bullet_points || "",
    }}
  />
        </Col>
      ),
      //   extra: genExtra(),
    },
  ];

  return (
    <Modal
      //   style={{ maxHeight: "80vh", overflowY: "auto" }}
      className="carousel-modal"
      // title="Select flagging reason"
      open={open}
      onOk={handleOk}
      onCancel={() => {
        handleOk();
        //     handleCancel();
        //     setFileList(null);
      }}
      title={[
        <Text style={{color: "#0a243f", fontSize: "18px", fontWeight: 500}}>
          Item details
        </Text>,
      ]}
      footer={[
        !is_available && (
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              borderTop: "1px solid #dedede",
              borderRadius: "0px 0px 16px 16px",
              height: "96px",
              boxShadow: "0 -6px 10px 0 rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              width: "100%",
            }}
          >
            <Button
              onClick={() => {
                handleOk();
                // handleCancel();
                // setFileList(null);
              }}
              style={{
                height: "48px",
                fontWeight: 500,
                fontSize: "14px",
                maxWidth: "120px",
                width: "100%",
              }}
            >
              CANCEL
            </Button>
            <Button
              onClick={() => handleSave(rowData)}
              style={{
                height: "48px",
                maxWidth: "200px",
                width: "100%",
                fontWeight: 500,
                fontSize: "14px",
                color: "white",
                backgroundColor: "#0354a3",
                border: "none",
              }}
            >
              {saveText || "Select"}
            </Button>
          </Col>
        ),
      ]}>
      <Col
        style={{
          height: "430px",
          overflow: "auto",
          // padding: "20px 30px",
        }}>
        <Col
          style={{
            // height: "400px",
            padding: "20px 30px",
          }}>
          <Col
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}>
            <Col style={{width: "40%"}}>
              <CustomCarousel products={images} />
            </Col>
            <Col>
              <Title
                style={{
                  color: "#0a243f",
                  // margin: "0 0 8px 0",
                  fontSize: "14px",
                  fontWeight: 500,
                }}>
                {productName}
              </Title>
              <Title
                style={{
                  color: "#0a243f",
                  // margin: "0 0 8px 0",
                  fontSize: "14px",
                  fontWeight: 400,
                }}>
                Brand: {brand_name}
              </Title>
              <Title
                style={{
                  color: "#0a243f",
                  fontSize: "14px",
                  fontWeight: 400,
                }}>
                MOBSKU: {mob_sku}
              </Title>
              <Title
                style={{
                  color: "#0a243f",
                  fontSize: "14px",
                  fontWeight: 400,
                }}>
                HSN: {hsn_code}
              </Title>
              <Title
                style={{
                  color: "#0a243f",
                  fontSize: "14px",
                  fontWeight: 400,
                }}>
                Unit: {unit}
              </Title>
              <Text
                style={{color: "#0a243f", fontSize: "16px", fontWeight: 500}}>
                Category: {category}
              </Text>
              <Title
                style={{
                  color: "#0a243f",
                  fontSize: "14px",
                  fontWeight: 400,
                }}>
                {`${sub_category_lvl_1} > ${sub_category_lvl_2}`}
              </Title>
            </Col>
          </Col>
        </Col>
        <Col style={{padding: "20px 30px"}}>
          <Collapse
            className="collapse-style"
            defaultActiveKey={["1"]}
            // onChange={onChange}
            expandIconPosition={"end"}
            items={productData}
            ghost
          />

          <Collapse
            className="collapse-style"
            defaultActiveKey={["1"]}
            // onChange={onChange}
            expandIconPosition={"end"}
            items={specsData}
            ghost
          />
        </Col>
      </Col>
    </Modal>
  );
};

export default ItemDetailsModal;
