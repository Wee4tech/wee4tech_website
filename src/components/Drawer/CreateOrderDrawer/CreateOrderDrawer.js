import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Spin,
  Drawer,
  Typography,
  Col,
  Avatar,
  Button,
  Row,
  Pagination,
} from "antd";
import { ReactComponent as CrossIcon } from "../../../assets/icons/x (3).svg";
import { ReactComponent as TableShopIcon } from "../../../assets/icons/TableShopicon.svg";
import "./CreateOrderDrawer.css";
import SearchInput from "../../Input/SearchInputs/SearchInput";
import SearchDropdown from "../../DropDown/SearchDropdown";
import CreateOrderModal from "../../Modal/CreateOrderModal/CreateOrderModal";
import { createOrderDrawerProductDataSelector } from "../../../redux/slices/createOrder/selector";
import {
  // getCreateOrderDrawerProductData,
  getCreateOrderModalProductData,
} from "../../../redux/slices/createOrder/action";
import { showSuccessToast } from "../../../NotificationToast/NotificationToast";

const { Title, Text } = Typography;

const CreateOrderDrawer = ({
  drawerVisible,
  setDrawerVisible,
  data,
  handleAddRow,
  tableIndex,
  getProductApi,
  getProductModalApi,
}) => {
  const [loading, setLoading] = useState(false);
  const drawerProductData = useSelector(createOrderDrawerProductDataSelector);
  const [brandsList, setBrandsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Set brands list
    setBrandsList(
      drawerProductData?.brands?.length ? drawerProductData.brands : []
    );

    // Set categories list
    setCategoryList(
      drawerProductData?.categories?.length ? drawerProductData.categories : []
    );
  }, [drawerProductData]);

  const dataList = drawerProductData?.data?.length
    ? drawerProductData?.data
    : [];

  useEffect(() => {
    // Set brands list
    setBrandsList(
      drawerProductData?.brands?.length ? drawerProductData.brands : []
    );

    // Set categories list
    setCategoryList(
      drawerProductData?.categories?.length ? drawerProductData.categories : []
    );
  }, [drawerProductData]);

  // const pricelist = drawerProductData?.intervals?.length
  // ? drawerProductData?.intervals
  // : [];
  // console.log(categoryList,brandsList, "👨🏼‍🦰👩🏼‍🦰")

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [searchedValue, setSearchedValue] = useState({}); 
  const [openModalCarousel, setOpenModalCarousel] = useState(false);
  const handleCarouselModal = (record) => {
    getProductModalApi({ id: record?.bmp_id, slug: record?.slug });
    setOpenModalCarousel(true);
  };

  const handleAddItem = (item) => {
    handleAddRow(tableIndex, item);
    showSuccessToast("Product Added!");
    setOpenModalCarousel(false);
  };
  const handleOkCarousel = () => {
    dispatch(getCreateOrderModalProductData({}));
    setOpenModalCarousel(false);
  };
  const closeDrawer = () => {
    setDrawerVisible(false);
    setSearchedValue({});
  };

  const handleSearchedValue = (params) => {
    setSearchedValue(params);
  };

  const handleFilterLibrary = (params) => {
    if (drawerVisible) {
      setLoading(true);
      let brandArray = [];
      let categoriesArray = [];
      brands.map((item) => brandArray.push(item.label));
      categories.map((item) => categoriesArray.push(item.label));
      getProductApi({
        id: data?.bmp_id,
        params: {
          ...(brandArray.length && { brands: brandArray }),
          ...(categoriesArray.length && { category: categoriesArray }),
        },
      });
      setCurrentPage(1);
      
    }
  };

  useEffect(
    (params) => {
      if (drawerVisible) {
        // let brandArray = [];
        // let categoriesArray = [];
        // brands.map((item) => brandArray?.push(item?.label));
        // categories.map((item) => categoriesArray.push(item.label));
        setLoading(true);
        getProductApi({
          id: data?.bmp_id,
          page: 1,
          // params,
        }).finally(() => {
          setLoading(false);
        });
      } else {
        //dispatch(getCreateOrderDrawerProductData({}));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    //[drawerVisible,brands,categories,getProductApi,data?.bmp_id]
    [drawerVisible, getProductApi, data?.bmp_id]
  );

  const handlePageChange = async (currPage) => {
    setLoading(true);
    // const params = {
    //   page: currPage,
    //   ...(data?.bmp_id && { id: data?.bmp_id }),
    // };

    // let brandArray = [];
    // let categoriesArray = [];
    // brands.map((item) => brandArray?.push(item?.label));
    // categories.map((item) => categoriesArray.push(item.label));
    // const params = {
    // ...(brandArray?.length && { brands: brandArray }),
    // ...(categoriesArray.length && { category: categoriesArray }),
    //};

    setCurrentPage(currPage);
    // await getProductApi({ id: data?.bmp_id, page: currPage,params }).finally(() => {
    //   setLoading(false);
    // });;
    await getProductApi({ id: data?.bmp_id, page: currPage }).finally(() => {
      setLoading(false);
    });
  };
  // const handleFilterLibrary = () => {
  //   let brandArray = [];
  //   let categoriesArray = [];
  //   brands.map((item) => brandArray?.push(item?.label));
  //   categories.map((item) => categoriesArray.push(item.label));
  //   const params = {
  //     ...(brandArray?.length && { brands: brandArray }),
  //     ...(categoriesArray.length && { category: categoriesArray }),
  //   };
  //   getProductApi({
  //     id: data?.bmp_id,
  //     page: 1,
  //     params,
  //   });
  //   setCurrentPage(1);
  // };
  // const handleFilterSelect = (label) => {
  // let brandArray = [];
  // // let categoriesArray = [];
  // brands.map((item) => brandArray?.push(item?.label));
  // categories.map((item) => categoriesArray?.push(item?.label));
  // if (label === "Categories") {
  // libraryTableApi({
  //   ...(brandArray.length && { brands: brandArray }),
  //   page: 1,
  // });
  // } else if (label === "Brands") {
  //   libraryTableApi({
  //     ...(categoriesArray.length && { category: categoriesArray }),
  //     // page: 1,
  //   });
  // }
  // setCurrentPage(1);
  //};
  return (
    <>
      <Drawer
        className="create-order-drawer"
        size="large"
        title={
          <>
            <Col style={{ padding: "10px" }}>
              <Col className="drawer-head-container">
                <Col className="drawer-cross-container" onClick={closeDrawer}>
                  <CrossIcon />
                </Col>
                <Title
                  level={4}
                  style={{ margin: 0, textAlign: "center", width: "100%" }}
                >
                  Product search
                  {/* {data?.vendor_name || ""} {data?.bmp_id || ""} */}
                </Title>
              </Col>
              <Col className="drawer-input-search">
                <SearchInput
                  size={"large"}
                  placeholder={"Search product/ category/ brand.."}
                  getLibraryApi={getProductApi}
                  width={"100%"}
                  handleSearchedValue={handleSearchedValue}
                  id={data?.bmp_id}
                  searchValue={true}
                />
              </Col>
              <Col className="fillter-container">
                {/* <SearchDropdown
                  // list={tableSelector?.results?.categories}
                  label={"All Filter"}
                  placeholder={"Search Filter"}
                  // selectedItems={categories}
                  // setSelectedItems={setCategories}
                  // handleFilterLibrary={handleFilterLibrary}
                  isCustomBorder={"8px"}
                  rightIcon={false}
                  leftIcon={true}
                /> */}
                <SearchDropdown
                  list={categoryList}
                  label={"Categories"}
                  placeholder={"Search categories"}
                  selectedItems={categories}
                  setSelectedItems={setCategories}
                  handleFilterLibrary={handleFilterLibrary}
                  isCustomBorder={"8px"}
                  setSearchText={setSearchedValue}
                />
                <SearchDropdown
                  list={brandsList}
                  label={"Brand"}
                  placeholder={"Search Brand"}
                  selectedItems={brands}
                  setSelectedItems={setBrands}
                  handleFilterLibrary={handleFilterLibrary}
                  //handleFilterSelect={handleFilterSelect}
                  isCustomBorder={"8px"}
                  setSearchText={setSearchedValue}
                />
                {/* <SearchDropdown
                  list={pricelist}
                  label={"Price"}
                  placeholder={"Search Price"}
                  // selectedItems={categories}
                  // setSelectedItems={setCategories}
                  // handleFilterLibrary={handleFilterLibrary}
                  isCustomBorder={"8px"}
                /> */}
                {/* <SearchDropdown
                  // list={tableSelector?.results?.categories}
                  label={"Color"}
                  placeholder={"Search Color"}
                  // selectedItems={categories}
                  // setSelectedItems={setCategories}
                  // handleFilterLibrary={handleFilterLibrary}
                  isCustomBorder={"8px"}
                /> */}
              </Col>
            </Col>
          </>
        }
        placement="right"
        closable={false}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Col>
          {searchedValue?.search !== "" &&
            searchedValue?.search !== undefined && (
              <>
                <Col className="no-product-container">
                  <Text className="no-product-container-text">
                    {searchedValue?.search || "N/A"}
                  </Text>
                  <Button
                    className="no-product-container-button"
                    onClick={() =>
                      handleAddRow(tableIndex, {
                        product_name: searchedValue?.search || "",
                      })
                    }
                  >
                    Create new and add
                  </Button>
                </Col>
              </>
            )}
          {/* {searchedValue?.search === "" ||
          drawerProductData?.data?.length !== 0 ? ( */}
          {loading ? (
            <Spin
              size="large"
              tip="Loading..."
              spinning={loading}
              style={{ display: "block", padding: "300px" }}
            />
          ) : (
            <>
              {dataList?.map((item) => {
                return (
                  <>
                    <Col className="body-container">
                      <Col
                        className="drawer-avatar-container"
                        style={{ width: "90%", justifyContent: "flex-start" }}
                      >
                        <Col>
                          <Avatar
                            shape="square"
                            style={{
                              backgroundColor: "#f3f2ef",
                              borderRadius: "16px",
                              cursor: "pointer",
                            }}
                            size={60}
                            icon={
                              <TableShopIcon style={{ marginTop: "12px" }} />
                            }
                            src={item?.product_image || ""}
                            onClick={() => handleCarouselModal(item)}
                          />
                        </Col>
                        <Col className="drawer-text-container">
                          <Text
                            className="text-name"
                            onClick={() => handleCarouselModal(item)}
                          >
                            {item?.product_name}
                          </Text>
                          <Text className="text-price">
                            {/* ₹ {(item?.store_selling_price || 0).toFixed(2)} (With Tax) */}
                            ₹{" "}
                            {(
                              (item?.store_selling_price || 0) +
                              (item?.product_tax_code?.tax
                                ? (item?.store_selling_price || 0) *
                                  (item?.product_tax_code?.tax / 100)
                                : 0)
                            ).toFixed(2)}{" "}
                            (With Tax)
                          </Text>
                          <Col className="code-container">
                            <Text className="code-text">
                              HSN Code: {item?.hsn_code || "N/A"}
                            </Text>
                            {/* <Text className="code-text">BMPID: {item?.bmp_id}</Text> */}
                          </Col>
                        </Col>
                      </Col>
                      <Button
                        className="drawer-button"
                        onClick={() => handleAddRow(tableIndex, item)}
                      >
                        Add
                      </Button>
                    </Col>
                  </>
                );
              })}
            </>
          )}
          {/* ) : ( */}

          {/* )} */}
        </Col>

        {drawerProductData?.pagination?.total_pages > 0 && (
          <Row className="your-order-container" style={{ float: "right" }}>
            <Pagination
              defaultCurrent={currentPage}
              current={currentPage}
              total={drawerProductData?.pagination?.total_pages || 0}
              pageSize={1}
              hideOnSinglePage
              showSizeChanger={false}
              //onChange={(e) => setCurrentPage(e)}
              onChange={handlePageChange}
              className="products-pagination"
            />
          </Row>
        )}
      </Drawer>
      <CreateOrderModal
        open={openModalCarousel}
        handleOk={handleOkCarousel}
        handleSave={handleAddItem}
        saveText={"Add"}
      />
    </>
  );
};
export default CreateOrderDrawer;
