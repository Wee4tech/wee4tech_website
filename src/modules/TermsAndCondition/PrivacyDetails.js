import React from "react";
import { Collapse, Typography} from "antd";


const PrivacyDetails = () => {
 
  const items = [
    {
      key: "1",
      label: "MAD OVER BUILDINGS (MOB)",
      children: <p>We take privacy very seriously. It is a legal requirement as well.<a href="www.madoverbuildings.com" target="_blank">www.madoverbuildings.com </a>(herein referred to as MOB) is always committed to protect your privacy when you visit our website. These policies only apply to our website and not to other companies, individuals or organizations who display our link. In similar fashion, our website might contain links or promotional details from other websites. MOB recommends referring to their privacy policies if you are accessing their website. MOB indemnifies itself against all data use on and reservations made via third party websites/agents.</p>,
    },
    {
      key: "2",
      label: "DISCLOSURE OF INFORMATION",
      children: <p>MOB will not sell, trade, or rent your personal information to others. We collect and use your information to comply with the law or for sending you information at your request. This information is collected for the safety of our customers, staffs and for records for legal compliance. Additional data may be collected for intelligence and/or statistical purposes. We may use IP addresses to compile and provide statistics about our visitors and traffic patterns as well as to administer the site and gather broad demographic information. IP addresses are not linked to personally identifiable information. MOB may release account information when such release is reasonably necessary to comply with the law; enforce the terms of any of our user agreements; or protect the rights, property, and safety of MOB, the users of its site, or others. Email address is required to send confirmation emails for reservations and in case we need to establish communication for any important/urgent matters. We are committed NOT to spam your email inbox</p>,
    },
    {
        key: "3",
        label: "WEBSITE AND DATA SECURITY",
        children: <p>We have ensured that we keep our website and data secured, we have put various security measures in place to block unauthorized traffic that may misuse our website or access the data. However, we also understand that internet is not the most secure medium. <a href="mailto:ask@madoverbuildings.com">ask@madoverbuildings.com</a></p>,
      },
      {
        key: "4",
        label: "CHANGES TO OUR PRIVACY POLICY",
        children: <p>We may change our privacy policy from time to time. Continued use of our website signifies that you adhere to our privacy policy. For any concerns please contact us at</p>
      },
      {
        key: "5",
        label: "YES WE DO USE YOUR COOKIES",
        children: <p>Cooies helps us improve user experience on your consent. Technology like cookies could be used to help you deliver content as per your preference, to help you process your reservations or other requests. While this cannot be used to disclose your identity, this information will identify your browser to our servers when you visit our site. To remove the cookies at any point from your computer, you can delete them using your browser</p>
      },
    
  ];

  return (
    <div>
        <Typography.Title level={4}>Privacy Policy</Typography.Title>
      <Collapse className="custom-collapse-terms"  items={items} defaultActiveKey={1} expandIconPosition="right"  />
    </div>
  );
};

export default PrivacyDetails;
