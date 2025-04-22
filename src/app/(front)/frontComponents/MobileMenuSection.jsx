import { baseUrl } from '@/Http/helper';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import MetisMenu from 'metismenujs';

function MobileMenuSection({ categories }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (menuRef.current && categories?.length > 0) {
      new MetisMenu(menuRef.current);
    }
  }, [categories]); // 🔁 run this effect whenever categories change

  return (
    <nav className="nav-main mainmenu-nav mt--30">
      <ul className="mainmenu metismenu" id="mobile-menu-active" ref={menuRef}>
        <li>
          <Link href={`${baseUrl}deals/hot-deals`} className="main">
            Hot Deal's
          </Link>
        </li>

        {categories?.map((category, index) => (
          <li className="has-droupdown" key={index}>
            <a href="#" className="main">{category.name}</a>

            {category.subcategories?.length > 0 && (
              <ul className="submenu mm-collapse">
                {category.subcategories.map((subcategory, subIndex) => (
                  subcategory.childcategory?.length > 0 ? (
                    <li className="has-droupdown third-lvl" key={subIndex}>
                      <a href="#" className="main">{subcategory.subCategoryName}</a>
                      <ul className="submenu-third-lvl mm-collapse">
                        {subcategory.childcategory.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link href={`${baseUrl}product/${category.slug}/${subcategory.slug}/${child.slug}`}>
                              {child.childCategoryName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li className="third-lvl" key={subIndex}>
                      <a href="#" className="main">{subcategory.subCategoryName}</a>
                    </li>
                  )
                ))}
              </ul>
            )}
          </li>
        ))}

       

       
      </ul>
    </nav>
  );
}

export default MobileMenuSection;
