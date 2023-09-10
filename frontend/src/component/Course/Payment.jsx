import React, { useState } from "react";
import axios from "axios";
import "./Payment.scss";

const Payment = () => {
  const [redirectUrl, setRedirectUrl] = useState("");
  const [courseInfo, setCourseInfo] = useState({
    coursename: "React Course",
    price: 5000,
    buyername: "Jack",
    redirect_url: "http://www.example.com/redirect",
    email: "riteshgharti121232@gmail.com",
    phone: "1234567899",
  });

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/pay", courseInfo);

      const { redirectUrl } = response.data;
      setRedirectUrl(redirectUrl);

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Payment request error:", error);
    }
  };

  // Destructure the courseInfo object for easier access
  const { coursename, price, buyername } = courseInfo;

  return (
    <div className="courseCard">
      <img
        src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2019/10/23170101/List-of-Professional-Courses-after-Graduation.gif"
        alt=""
        className="course-card__image"
      />
      <div className="course-card__content">
        <div className="course-card__title">{coursename}</div>
        <div className="course-card__buttons">
          <button onClick={handlePayment} className="course-card__button">
            BUY {price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
