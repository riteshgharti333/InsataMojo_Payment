const express = require('express');
const router = express.Router();
const Instamojo = require('instamojo-nodejs');
const Course = require('../models/Course');

router.post('/pay', async (req, res) => {
  Instamojo.setKeys('test_38d562208d758d6cf00e518ff69', 'test_09414013dae7701796c6665f439');
  Instamojo.isSandboxMode(true);

  const paymentData = {
    purpose: req.body.coursename,
    amount: req.body.price,
    buyer_name: req.body.buyer_name,
    redirect_url: req.body.redirect_url,
    email: req.body.email,
    phone: req.body.phone,
    send_email: true,
    webhook: 'http://www.example.com/webhook/',
    send_sms: true,
    allow_repeated_payments: false,
  };

  try {
    const course = new Course(req.body);
    await course.save();

    Instamojo.createPayment(paymentData, (error, response) => {
      if (error) {
        console.error('Payment request error:', error);
        res.status(500).send('Payment request failed');
      } else {
        try {
          const responseData = JSON.parse(response);

          if (responseData && responseData.payment_request && responseData.payment_request.longurl) {
            const redirectUrl = responseData.payment_request.longurl;
            res.status(200).json({ redirectUrl });
          } else {
            console.error('Invalid API response:', response);
            res.status(500).send('Invalid API response');
          }
        } catch (parseError) {
          console.error('Error parsing API response:', parseError);
          res.status(500).send('Error parsing API response');
        }
      }
    });
  } catch (dbError) {
    console.error('Database error:', dbError);
    res.status(500).send('Database error');
  }
});

module.exports = router;
