 
 
import React, { useState, useEffect, useRef } from "react";

const PriceFilter = (props) => {
  
  
  const isFirstPriceRender = useRef(true);
  const [minPrice, setMinPrice] = useState(props.minp);
  const [maxPrice, setMaxPrice] = useState(props.maxp);
  const [minValue, setMinValue] = useState(false)

  const scaleRef = useRef(null);
  const toggleMinRef = useRef(null);
  const toggleMaxRef = useRef(null);
  const barRef = useRef(null);

  const MIN_PRICE = props.minp;
  const MAX_PRICE = props.maxp;
  
  useEffect(() => {
    updateUI();
    window.addEventListener("resize", updateUI);
    return () => window.removeEventListener("resize", updateUI);
    
    
  }, [minPrice, maxPrice]);

  useEffect(() => {
    //console.log('branddddd', props.brandid)
    if(props.brandId.length > 0 || props.reviewValue > 0){

    } else {

    /* let product = props.products
    
    let prodPrice = product.map((list,index) => {
      return list.variant.consumerSalePrice
    })
    prodPrice = prodPrice.sort(
      (a, b) => a - b
    );
    */
    //console.log('pricesssssss', prodPrice)
    //setMinPrice(prodPrice[0])
    //setMaxPrice(prodPrice[prodPrice.length - 1])
  }

  },[props.products.length])
  
  
  useEffect(()=>{
     
    if (isFirstPriceRender.current) {
      isFirstPriceRender.current = false;
      return; 
    }

    if(maxPrice > 0){
      
    props.getPrice(minPrice, maxPrice)
    }
  },[minValue])

  const getScaleDimensions = () => {
    if (!scaleRef.current) return { left: 0, width: 1 };
    const rect = scaleRef.current.getBoundingClientRect();
    return { left: rect.left, width: rect.width };
  };

  const valueToPosition = (value) => {
    const { width } = getScaleDimensions();
    return ((value - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * width;
  };

  const positionToValue = (pos) => {
    const { width } = getScaleDimensions();
    return Math.round(MIN_PRICE + (pos / width) * (MAX_PRICE - MIN_PRICE));
  };

  const updateUI = () => {
    if (!toggleMinRef.current || !toggleMaxRef.current || !barRef.current) return;

    const posMin = valueToPosition(minPrice);
    const posMax = valueToPosition(maxPrice);
    const toggleWidth = toggleMinRef.current.offsetWidth;

    toggleMinRef.current.style.left = `${posMin - toggleWidth / 2}px`;
    toggleMaxRef.current.style.left = `${posMax - toggleWidth / 2}px`;

    updateBar();

    
  };

  const updateBar = () => {
    if (!toggleMinRef.current || !toggleMaxRef.current || !barRef.current) return;
    const toggleWidth = toggleMinRef.current.offsetWidth;
    const posMin = parseFloat(toggleMinRef.current.style.left) + toggleWidth / 2;
    const posMax = parseFloat(toggleMaxRef.current.style.left) + toggleWidth / 2;
    barRef.current.style.left = `${posMin}px`;
    barRef.current.style.width = `${posMax - posMin}px`;
  };

  const addDrag = (toggleRef, isMin) => {
  const toggle = toggleRef.current;
  if (!toggle) return;

  const startDrag = (startX) => {
    const toggleWidth = toggle.offsetWidth;
    const { left: scaleLeft, width: scaleWidth } = getScaleDimensions();

    const onMove = (moveX) => {
      let newCenter = moveX - scaleLeft;

      if (isMin) {
        newCenter = Math.max(0, newCenter);
        const maxCenter = parseFloat(toggleMaxRef.current.style.left) + toggleWidth / 2;
        newCenter = Math.min(newCenter, maxCenter);
      } else {
        newCenter = Math.min(scaleWidth, newCenter);
        const minCenter = parseFloat(toggleMinRef.current.style.left) + toggleWidth / 2;
        newCenter = Math.max(newCenter, minCenter);
      }

      const newValue = positionToValue(newCenter);
      isMin ? setMinPrice(newValue) : setMaxPrice(newValue);

      updateBar();
    };

    const onMouseMove = (e) => onMove(e.clientX);
    const onTouchMove = (e) => onMove(e.touches[0].clientX);

    const onEnd = () => {
      setMinValue((val) => !val);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onEnd);
  };

  toggle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    startDrag(e.clientX);
  });

  toggle.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startDrag(e.touches[0].clientX);
  });
  
    
    /* const toggle = toggleRef.current;
    if (!toggle) return;

    toggle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const toggleWidth = toggle.offsetWidth;
      const { left: scaleLeft, width: scaleWidth } = getScaleDimensions();

      const onMouseMove = (e) => {
        let newCenter = e.clientX - scaleLeft;

        if (isMin) {
          newCenter = Math.max(0, newCenter);
          const maxCenter = parseFloat(toggleMaxRef.current.style.left) + toggleWidth / 2;
          newCenter = Math.min(newCenter, maxCenter);
        } else {
          newCenter = Math.min(scaleWidth, newCenter);
          const minCenter = parseFloat(toggleMinRef.current.style.left) + toggleWidth / 2;
          newCenter = Math.max(newCenter, minCenter);
        }

        const newValue = positionToValue(newCenter);
        if (isMin) {
          setMinPrice(newValue);
        } else {
          setMaxPrice(newValue);
        }

        updateBar();
      };

      const onMouseUp = () => {
        
        setMinValue((minValue)=>!minValue)
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
    */
  };

  useEffect(() => {
    addDrag(toggleMinRef, true);
    addDrag(toggleMaxRef, false);
  }, []);

  if(props.mobile){
    return (
      <div className="accordion-content">
        {/* <h5 className="title">Price Filter</h5> */}
        <div className="price-filter">
          <div className="price-filters">
            <label>
              <input type="text" value={minPrice || ""} readOnly />
            </label>
            <span>-</span>
            <label>
              <input type="text" value={maxPrice || ""} readOnly />
            </label>
          </div>
  
          <div className="range-controls" ref={scaleRef}>
            <div className="scale">
              <div className="bar" ref={barRef} />
            </div>
            <div className="range-toggle range-toggle-min" ref={toggleMinRef} />
            <div className="range-toggle range-toggle-max" ref={toggleMaxRef} />
          </div>
        </div>
      </div>
    );
  }


  
  return (
    <div className="single-filter-box">
      <h5 className="title">Price Filter</h5>
      <div className="price-filter">
        <div className="price-filters">
          <label>
            <input type="text" value={minPrice || ""} readOnly />
          </label>
          <span>-</span>
          <label>
            <input type="text" value={maxPrice || ""} readOnly />
          </label>
        </div>

        <div className="range-controls" ref={scaleRef}>
          <div className="scale">
            <div className="bar" ref={barRef} />
          </div>
          <div className="range-toggle range-toggle-min" ref={toggleMinRef} />
          <div className="range-toggle range-toggle-max" ref={toggleMaxRef} />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;

