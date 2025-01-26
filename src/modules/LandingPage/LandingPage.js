import React from 'react';
import { Layout, Menu, Carousel, Card, Row, Col } from 'antd';
import WOW from 'wowjs';
import './LandingPage.css';

const { Header, Content, Footer } = Layout;

const LandingPage = () => {
  // Initialize WOW.js
  new WOW.WOW().init();

  return (
    <Layout className="layout">


      <Content>
        {/* Hero Section */}
        <Carousel autoplay>
          <div>
            <h2>We are professional</h2>
            <p>Welcome to Wee4 Tech Solutions, where innovation meets excellence in software solutions.</p>
          </div>
          <div>
            <h2>Grow your business online with us</h2>
            <p>We specialize in crafting cutting-edge software to empower businesses and individuals alike.</p>
          </div>
        </Carousel>

        {/* About Section */}
        <section id="about" className="wow fadeIn">
          <h2>Wee4tech</h2>
          <p>At Wee4 Tech, our mission is to revolutionize the digital landscape through intuitive and impactful software solutions.</p>
        </section>

        {/* Services Section */}
        <section id="services" className="wow fadeIn">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Custom Software Development">
                <p>From conceptualization to deployment, we offer end-to-end custom software development services.</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Enterprise Application Development">
                <p>Streamline your business processes and enhance productivity with our tailored enterprise application solutions.</p>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="wow fadeIn">
          <h2>Testimonials</h2>
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <p>"Wee4 Tech Solutions transformed our business!" - Client A</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <p>"Their team is highly skilled and professional." - Client B</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <p>"Exceptional service and support!" - Client C</p>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Clients Section */}
        <section id="clients" className="wow fadeIn">
          <h2>Clients</h2>
          <Row gutter={16}>
            <Col span={6}><img src="assets/img/clients/LOGO - 3D RENDERSHOP.png" alt="Client Logo" /></Col>
            <Col span={6}><img src="assets/img/clients/online-logo.png" alt="Client Logo" /></Col>
          </Row>
        </section>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        © 2023 Wee4 Tech Solutions. All Rights Reserved.
      </Footer>
    </Layout>
  );
};

export default LandingPage;
