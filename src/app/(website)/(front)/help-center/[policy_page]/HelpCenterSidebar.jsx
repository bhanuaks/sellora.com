"use client"
import React, { useState, useRef } from 'react';
import { baseUrl } from '@/Http/helper';
import Link from 'next/link';

const SidebarSection = ({ title, icon, links, index, activeIndex, onClick }) => {
  const contentRef = useRef(null);
  const isActive = activeIndex === index;

  return (
    <div className="order-card2">
      <div className="order-header2" onClick={() => onClick(index)}>
        <div className="icon2">
          <img src={`${baseUrl}${icon}`} alt={`${title} icon`} />
        </div>
        <div className="title">{title}</div>
      </div>
      <ul
        className="order-list2"
        style={{
          maxHeight: isActive ? `${contentRef.current?.scrollHeight}px` : null,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
        ref={contentRef}
      >
        {links.map((link, i) => (
          <li key={i}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HelpCenterSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = index => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const sidebarData = [
    {
      title: 'Account',
      icon: 'front/assets/images/order.png',
      links: [
        { label: 'Create or Edit Account', href: '/help-center/create-or-edit-account' },
        {
          label: 'Account Security or Unrecognized Charges or Orders',
          href: '/help-center/account-security-or-unrecognized-charges-or-orders',
        },
      ],
    },
    {
      title: 'Your Order',
      icon: 'front/assets/images/order.png',
      links: [
        { label: 'Track Your Order', href: '/help-center/track-your-order' },
        { label: 'Backorder', href: '/help-center/backorder' },
        { label: 'Missing Items', href: '/help-center/missing-items' },
        { label: 'Orders not Received', href: '/help-center/orders-not-received' },
        { label: 'Reorder', href: '/help-center/reorder' },
        { label: 'Return', href: '/help-center/return' },
        { label: 'Shipping & Delivery', href: '/help-center/delivery-information' },
      ],
    },
    {
      title: 'Payment Method',
      icon: 'front/assets/images/payment_1.png',
      links: [{ label: 'Payment Method', href: '/help-center/payment' }],
    },
    {
      title: 'Cancellation and Return Policy',
      icon: 'front/assets/images/cancellation.png',
      links: [
        { label: 'Cancellation Policy', href: '/help-center/cancellation-policy' },
        { label: 'Return Policy', href: '/help-center/return-policy' },
      ],
    },
    {
      title: 'Terms of Use',
      icon: 'front/assets/images/cancellation.png',
      links: [{ label: 'Terms & Conditions', href: '/help-center/terms-of-use' }],
    },
    {
      title: 'Privacy Policies',
      icon: 'front/assets/images/policies.png',
      links: [{ label: 'Privacy Policy', href: '/help-center/privacy-policy' }],
    },
    {
      title: 'FAQ’s',
      icon: 'front/assets/images/faq_ere.png',
      links: [{ label: 'FAQ’s', href: '/help-center/faq' }],
    },
  ];

  return (
    <div className="col-lg-4">
      <div className="sticky-top2">
        <div className="left_heding">Account</div>
        {sidebarData.map((section, index) => (
          <SidebarSection
            key={index}
            index={index}
            activeIndex={activeIndex}
            onClick={handleToggle}
            title={section.title}
            icon={section.icon}
            links={section.links}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpCenterSidebar;
