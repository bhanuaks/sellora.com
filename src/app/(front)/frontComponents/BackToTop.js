'use client';
import React, { useEffect, useRef } from "react";
import $ from "jquery";

const BackToTop = () => {
  const progressWrapRef = useRef(null);

  useEffect(() => {
    const backToTopInit = () => {
      const progressWrap = progressWrapRef.current;
      if (!progressWrap) return;

      const progressPath = progressWrap.querySelector("path");
      if (!progressPath) return;

      const pathLength = progressPath.getTotalLength();

      progressPath.style.transition = "none";
      progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
      progressPath.style.strokeDashoffset = pathLength;

      const updateProgress = () => {
        const scroll = $(window).scrollTop();
        const height = $(document).height() - $(window).height();
        const progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress;
      };

      updateProgress();
      $(window).on("scroll", updateProgress);

      const offset = 150;
      const duration = 500;

      $(window).on("scroll", () => {
        if ($(window).scrollTop() > offset) {
          $(progressWrap).addClass("active-progress");
        } else {
          $(progressWrap).removeClass("active-progress");
        }
      });

      $(progressWrap).on("click", (event) => {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, duration);
      });
    };

    backToTopInit();

    // Cleanup to remove event listeners on unmount
    return () => {
      $(window).off("scroll");
      if (progressWrapRef.current) {
        $(progressWrapRef.current).off("click");
      }
    };
  }, []);

  return (
    <>
      <div id="anywhere-home" className="anywhere" />
      <div className="progress-wrap" ref={progressWrapRef}>
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        .progress-wrap.active-progress {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  box-shadow:#3c5f2710 0px 0px 6px 7px;
}

.progress-wrap::after {
  position: absolute;
  font-family: var(--font-three);
  content: "\f077";
  text-align: center;
  line-height: 46px;
  font-size: 16px;
  color: #3c5f27;
  left: 0;
  top: 0;
  height: 46px;
  width: 46px;
  cursor: pointer;
  display: block;
  z-index: 1;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  border: 0px solid #3c5f27;
  box-shadow: none;
  border-radius: 50% !important;
  border-radius: 5px;
  font-weight: 300;
}

.progress-wrap:hover::after {
  opacity: 1;
  content: "\f077";
  border: 0px solid #3c5f27;
  font-weight: 300;
}

.progress-wrap::before {
  position: absolute;
  font-family: var(--font-three);
  content: "\f077";
  text-align: center;
  line-height: 46px;
  font-size: 16px;
  opacity: 0;
  background: #3c5f27;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  left: 0;
  top: 0;
  height: 46px;
  width: 46px;
  cursor: pointer;
  display: block;
  z-index: 2;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  font-weight: 300;
}

.progress-wrap:hover::before {
  opacity: 0;
}

.progress-wrap svg path {
  fill: none;
}

.progress-wrap svg {
  color: #3c5f27;
  border-radius: 50%;
  background: #fff;
}

.progress-wrap svg.progress-circle path {
  stroke: #3c5f27;
  stroke-width: 0px;
  box-sizing: border-box;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  padding: 2px;
}
      `}</style>
    </>
  );
};

export default BackToTop;
