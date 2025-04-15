"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { baseUrl } from "@/Http/helper";
import { apiRequest } from "@/Http/apiHelper";
import { ToastContainer, toast } from "react-toastify";

const QuestionsAnswers = ({ product_id, slug }) => {
  const [question, setQuestion] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [errors, setErrors] = useState({});
  const [proccess, setProccess] = useState(false);

   const [reviewData, setReviewData] = useState({
      question: "",
      product_id: product_id,
    });

    function hendleInputData(e) {
      const { name, value } = e.target;
      
      setReviewData((preData) => ({
        ...preData,
        [name]: value,
      }));
      if (!value) {
        setErrors((preData) => ({
          ...preData,
          [name]: `${name} is required.`,
        }));
      } else {
        setErrors((preData) => ({
          ...preData,
          [name]: ``,
        }));
      }
    }


      function submitReview(e) {
       
        e.preventDefault();
    
        setProccess(true)
        fetch(`${baseUrl}api/user/product-question-answer`, {
          method: "POST",
          body: JSON.stringify(reviewData),
        })
          .then((response) => {
            if (!response.ok) {
              setProccess(false)
              throw new Error("Network Error");
            }
            return response.json();
          })
          .then((res) => {
            
            setProccess(false)
            if (res.status) {
              setReviewData((preData) => ({
                ...preData,
                question: "",
              }));
              toast.success("Thank You!");
              getQuestionData();

            } else if (res.data.status_code == 403) {
              setErrors(res.data.errors);
            }
          });
      }


      async function getQuestionData() {
        const data = await apiRequest(
          `/api/product/fetch-question?product_id=${product_id}`,
          "GET"
        );
        if (data.status) {
          setQuestion(data.data.questions);
        }
      }
  useEffect(() => { 
    getQuestionData();
  }, [product_id]);

  async function searchQuestionData(searchData) {
    const data = await apiRequest(
      `/api/product/fetch-question?product_id=${product_id}&searchText=${searchData}`,
      "GET"
    );
    if (data.status) {
      setQuestion(data.data.questions);
    }
  }
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchQuestionData(searchText);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  return (
    <>
    <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {/* loader start */}
          <div className="loaderouter">
            <div className="loader"></div>
          </div>
      <div className="questions_answers" bis_skin_checked={1}>
        <div className="container" bis_skin_checked={1}>
          <div className="row" bis_skin_checked={1}>
            <div className="col-lg-12" bis_skin_checked={1}>
              <div className="" bis_skin_checked={1}>
                <h2 className="title-left">
                  {" "}
                  Questions and Answers for specific info?{" "}
                </h2>
              </div>
            </div>
            <div className="col-lg-4" bis_skin_checked={1}>
              <div
                className="form-group has-search question_anser_specific"
                bis_skin_checked={1}
              >
                <span className="fa fa-search form-control-feedback2" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Questions and Answers"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            {question &&
              question.length &&
              question.map((item, index) => (
                <div className="col-lg-12" bis_skin_checked={index} key={index}>
                  <div className="question_ansewer" bis_skin_checked={index}>
                    <p>
                      <strong>Question:</strong> {item.question}
                    </p>
                    {item.answer && (
                      <p>
                        <span className="orange">Answer:</span> {item.answer}
                      </p>
                    )}
                  </div>
                </div>
              ))}
        <form onSubmit={(e)=>submitReview(e)}>
            <div className="col-lg-5" bis_skin_checked={1}>
              <div className="input-group ask_a_question" bis_skin_checked={1}>
                <input
                  type="text"
                  name="question"
                  className="form-control"
                  placeholder="Didn t find the answer you need?"
                  onChange={(e) => hendleInputData(e)}
                  value={reviewData.question || ""}
                />
                 {errors?.question && (
                          <div className="error_message">
                            {errors?.question}
                          </div>
                        )}
                <div className="input-group-append" bis_skin_checked={1}>
                  {/* <Link href={`${baseUrl}user/ask-question/${slug}`}> */}
                    <button className="ask"  disabled={proccess}>
                     {proccess?"submiting..":"Ask your question"} 
                    </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuestionsAnswers;
