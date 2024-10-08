import React, { useState } from "react";
import "./ProductDetailComponent.scss";

import { Col, Row } from "antd";
import { FaStar } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { IoIosRemove } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import { addToCart } from "../../redux/slides/orderSlides";

import * as ProductServices from "../../services/ProductServices";
import Drawer from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";

const ProductDetailComponent = ({ idProduct }) => {
  // dispath
  const dispath = useDispatch();
  // redux user
  const user = useSelector((state) => state.user);
  // drawer-up
  const [drawerUp, setDrawerUp] = useState(false);
  // properties - handle form login Active
  const { setLoginActive, setActiveForm } = useOutletContext();

  // Fetch : Get Product Details
  const fetchGetProductDetails = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    const res = await ProductServices.getDetailsProduct(id);
    return res.data;
  };

  const handleClickAddToCard = () => {
    if (!user?.id) {
      setLoginActive();
      setActiveForm(true);
    } else {
      setDrawerUp(true);
      dispath(
        addToCart({
          orderItems: {
            name: productDetail?.name,
            amount: 1,
            image: productDetail?.image,
            price: productDetail?.price,
            product: productDetail?._id,
          },
        })
      );
    }
  };

  // useQuery / get dữ liệu về khi enable : !!idProduct (trả về true nếu khác undefined và null)
  // nếu muốn truyền params vào hàm queryFn thì nên truyền theo kiểu lấy context ra và get -> đừng truyền thẳng.
  const { isLoading, data: productDetail } = useQuery({
    queryKey: ["detailProduct", idProduct],
    queryFn: fetchGetProductDetails,
    enabled: !!idProduct,
  });

  const renderStar = (rate) => {
    // array chứa dữ liệu render
    const render = [];
    for (let i = 0; i < rate; i++) {
      // sau mỗi vòng lặp push data vào render[]
      render.push(
        <FaStar
          key={i}
          style={{ fontSize: "16px", color: "rgba(255,208,0,1" }}
        ></FaStar>
      );
    }
    return render;
  };

  const customCloseIcon = (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: "5%",
        color: "white",
      }}
    >
      <span style={{ textTransform: "uppercase" }}>Đóng</span>
      <IoIosRemove style={{ marginRight: 8, fontSize: "22px" }} />
    </span>
  );

  return (
    <Loading isPending={isLoading}>
      <div className="Product-Detail-Container">
        <Row className="Wrapper Layout">
          {/* Left Col Content */}
          <Col span={12} className="Left-Col">
            <div
              className="Image-Product_Detail"
              style={{ backgroundImage: `url(${productDetail?.image})` }}
            ></div>
            <div className="ExtraImage-Product_Detail flex-center-center">
              {/* extra image below */}
              <div className="extra"></div>
              <div className="extra"></div>
              <div className="extra"></div>
            </div>
          </Col>

          {/* Right Col Content */}
          <Col span={12} className="Right-Col">
            <div className="title">{productDetail?.name}</div>
            <div className="prices">
              {productDetail?.price.toLocaleString()}{" "}
              <span className="prices-d">đ</span>
            </div>
            {/* main info product details */}
            <div className="product-detail-info">
              <div className="product-des-info">
                {productDetail?.description}
              </div>
              <div className="product-status">
                {productDetail?.countInStock > 0 && <span>sẳn có</span>}
                <span className="countInStock">
                  {productDetail?.countInStock}
                </span>
              </div>
              <button className="btn-addCart" onClick={handleClickAddToCard}>
                thêm vào giỏ hàng
              </button>
              {renderStar(productDetail?.rating)}
            </div>
            {/* sub info product detail */}
            <div className="product-detail-subinfo">
              <div className="info-hotline"></div>
              <div className="favorite flex-center-center">
                <BiHeart></BiHeart>
                <span>Thêm yêu thích</span>
              </div>
              <div className="info-transfer flex-center-center">
                <div className="trans-items">
                  <div className="trans-items-shipping icons"></div>
                  <div className="trans-items-right">
                    <h2>Miễn phí giao hàng trong Tp HCM</h2>
                    <span>(Sản phẩm trên 690.000đ)</span>
                  </div>
                </div>
                <div className="trans-items">
                  <div className="trans-items-calendar icons"></div>
                  <div className="trans-items-right">
                    <h2>Đổi Trả Dễ Dàng</h2>
                    <span>
                      (Đổi trả trong vòng 3 ngày nếu có lỗi từ nhà sản xuất)
                    </span>
                  </div>
                </div>
                <div className="trans-items">
                  <div className="trans-items-Phone icons"></div>
                  <div className="trans-items-right">
                    <h2>Tổng Đài Bán Hàng 033 309 0XXX</h2>
                    <span>(Hỗ trợ tư vấn từ 8h30 - 21h30 mỗi ngày)</span>
                  </div>
                </div>
              </div>
              <div className="product-code text">
                Mã : <span> {productDetail?.masanpham}</span>
              </div>
              <div className="share flex-center-center text">
                <span>Chia sẻ:</span>
                <div className="share-link flex-center-center">
                  <a href="/" className="share-link-items">
                    <CgFacebook></CgFacebook>
                  </a>
                  <a href="/" className="share-link-items">
                    <BsTwitter></BsTwitter>
                  </a>
                  <a href="/" className="share-link-items">
                    <AiOutlineMail></AiOutlineMail>
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Drawer
          title="Giỏ Hàng"
          isOpen={drawerUp}
          onClose={() => setDrawerUp(false)}
          placement="right"
          width="30%"
          forceRender
          closeIcon={customCloseIcon}
        ></Drawer>
      </div>
    </Loading>
  );
};

export default ProductDetailComponent;
