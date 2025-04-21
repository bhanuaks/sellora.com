import { baseUrl } from '@/Http/helper'
import React from 'react'

function page() {
  return (
    <>
  <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Sellora</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\nbody\n{ margin:0px;\n\tpadding:0px;\t\n   /*background:#efefef url(images/image.png) no-repeat;*/\n    background: linear-gradient(90deg, #033a60 0%, #3fadf9 35%, #003d66 100%);\n\tbackground-size: cover;\n}\n\n.body_inner{background:url(images/image.png) no-repeat; background-size: cover; height: 100vh;}\n\n\n\n.main\n{\n\tmargin:50px auto;\n\tpadding:15px 40px;\n\twidth:650px;\n\theight:320px; background:transparent;\n\t/*background:#fff url(images/arieswolf.jpg) center no-repeat;*/\n\t\n/*\tbox-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;*/\n\n}\nh1{\n\tmargin:15px 40px 15px 40px;\n\tpadding:0px 0px 15px 0px;\n\ttext-align:center;\n/*\tfont:bold 28px Verdana, Geneva, sans-serif;*/\n\tcolor:#023b74;\n\tfont-family: "Open Sans", sans-serif;\n\tfont-weight:700;\n\tfont-size:24px;\n\t\n}\nh2{\n\tmargin:0px 0px 15px 0px;\n\tpadding:0px;\n\ttext-align: center;\n/*\tfont:bold 17px Verdana, Geneva, sans-serif;*/\n\tcolor:#023b74; \n\ttext-align:center; \n\tfont-weight:500;\n\tfont-family: "Open Sans", sans-serif; \n\tfont-size:16px;\n\tfont-style: italic; letter-spacing: 1px;\n}\np{\n\tmargin:0px 0px 20px 0px;\n\tpadding:0px;\n\tfont:14px/20px Verdana, Geneva, sans-serif;\n\tcolor:#000; text-align: center;\n}\np a{\n\tpadding:0px;\n/*\tfont:22px Verdana, Geneva, sans-serif;*/\n\tcolor:#fc7035; text-decoration: none;\n\tfont-family: "Open Sans", sans-serif; \n\tfont-size:30px;\n}\np a:hover{\n \n\tcolor:#000;  \n}\n\n\n.box{background:#fff;\n  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; border-radius:10px; padding: 20px 20px;}\n\n\n\n.user__details {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content:space-around;\n  margin: 20px 0 12px 0;\n}\n/* inside the form user details */\n.user__details .input__box {\n  width: calc(100% / 3 - 0px);\n  margin-bottom: 15px;\n}\n\n.user__details .input__box .details {\n  font-weight: 500;\n  margin-bottom: 5px;\n  display: block;\n}\n.user__details .input__box input {\n  height: 40px;\n  width: 100%;\n  outline: none;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  padding-left: 15px;\n  font-size: 14px;\n  border-bottom-width:1px;\n  transition: all 0.3s ease;\n  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;\n\n}\n\n.user__details .input__box input::placeholder{color:#b8b7b7}\n\n.button input {padding:11px 20px; \n  width:100px;\n  color: #fff; \n  font-size: 18px;\n  font-weight: 500;\n  border-radius: 5px;\n  background:#ff6e35;\n  transition: all 0.3s ease;\n  border:none;\n  cursor: pointer;\n}\n\n .button input:hover {\n  background:#000000;\n}\n\n\n\n'
    }}
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet"
  />
  <div className="body_inner">
    <div className="main">
      <div
        style={{
          textAlign:
            "center" /*borderBottom: '2px solid transparent', borderImage: 'linear-gradient(0.25turn, rgb(255 249 34 / 8%), rgb(252 112 53), rgba(56, 2, 155, 0))', */,
          borderImageSlice: 1,
          width: "100%",
          paddingBottom: 10
        }}
      >
        <img src={ `${baseUrl}front/assets/images/logo-01.png`} />
      </div>
      <br />
      <div className="box">
        <h1>Our new website is on its way.</h1>
        <div
          style={{
            borderBottom: "1px solid transparent",
            borderImage:
              "linear-gradient(90deg, #ffffff 0%, #fc7035 35%, #ffffff 100%)",
            borderImageSlice: 1,
            width: "100%",
            paddingBottom: 40,
            height: 1,
            padding: 0,
            margin: "0px 0px 20px 0px"
          }}
        />
        <h2>Sign up to be the first to know when we launch.</h2>
        <div>
          <form action="send_mail.php" method="post">
            <div className="user__details">
              <div className="input__box">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  name="name"
                  required=""
                />
              </div>
              <div className="input__box">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter a valid email address"
                  required=""
                />
              </div>
              <div className="button">
                <input type="submit" defaultValue="Submit" />
              </div>
            </div>
          </form>
        </div>
        {/* <p><a href="mailto:paula@sellora.com" target="_blank">paula@sellora.com</a> </p> */}
      </div>
      <div style={{ clear: "both" }} />
    </div>
  </div>
</>

  )
}

export default page