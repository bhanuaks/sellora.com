"use client"
import { useState } from "react";
import Link from "next/link";
import { baseUrl } from "@/Http/helper";

const CategoryMenu = ({ allCategory }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleSubmenu = (catIndex) => {
    setExpandedCategory(expandedCategory === catIndex ? null : catIndex);
  };
  if(!allCategory){
    
        return <></>
  }

  return (
    <ul  className={`${expandedCategory?"category-sub-menu metismenu expanded":"category-sub-menu metismenu"}`}
    id="category-active-four">
      {allCategory && allCategory.length > 0 &&
        allCategory.map((category, catIndex) =>
          category.subcategories.length > 0 ? (
            <li key={catIndex}>
              <Link
                href={`${baseUrl}product/${category.slug}`}
                className="menu-item"
               
              >
                <span>{category.name}</span>
                {expandedCategory === catIndex ?( <i className="fa-regular fa-minus"  onClick={() => toggleSubmenu(catIndex)}/>) : ( <i className="fa-regular fa-plus"  onClick={() => toggleSubmenu(catIndex)} />)}
                {/* <i className="fa-regular fa-plus" /> */}
              </Link>
              <ul
                className={`submenu ${expandedCategory === catIndex ? "expanded mm-collapse mm-show" : "submenu mm-collapse"}`}
                style={{height:`${expandedCategory === catIndex ? "auto" : "0px"}`}}
              >
                {category.subcategories.map((subCatItem, subCatItemIndex) => (
                  <li key={subCatItemIndex}>
                    <Link
                      className="mobile-menu-link"
                      href={`${baseUrl}product/${category.slug}/${subCatItem.slug}`}
                    >
                      {subCatItem?.subCategoryName}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={catIndex}>
              <Link href={`${baseUrl}product/${category.slug}`} className="menu-item">
                <span>{category.name}</span>
              </Link>
            </li>
          )
        )}
    </ul>
  );
};

export default CategoryMenu;
