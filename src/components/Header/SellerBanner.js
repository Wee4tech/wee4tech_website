import React from "react";
import {
  SellerBannerWrapper,
  SellerProfileText,
  SellerViewText,
} from "./NavbarStyled";
import { useNavigate } from "react-router-dom";
import { getViewStatus } from "../../redux/slices/sellerCatalogue/action";
import { useDispatch, useSelector } from "react-redux";
import { sellerViewStatusSelector } from "../../redux/slices/sellerCatalogue/selector";
const SellerBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sellerStatus = useSelector(sellerViewStatusSelector);
  const handleAdminViewNavigation = () => {
    // navigate(`/admin/sellers`);
    navigate(`/admin/sellers/seller-view/${sellerStatus?.bmp_id}`);
    dispatch(getViewStatus({}));
  };
  return (
    <>
      <SellerBannerWrapper>
        <SellerViewText>
          You are in the seller view. Any changes done will immediately reflect
          in the seller view.
        </SellerViewText>
        <SellerProfileText onClick={handleAdminViewNavigation}>
          Exit and back to admin view
        </SellerProfileText>
      </SellerBannerWrapper>
    </>
  );
};

export default SellerBanner;
